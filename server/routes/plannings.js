var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');
const validator = require("../modules/validator.js");

// COMMONS

/**
 * Return the index of the task which name matches exname
 * @param {*} exname the name to find
 * @param {*} tasks list of tasks
 */
let getTaskIndex = (exname, tasks) => {
    for(i in tasks) {
        if(tasks[i].name === exname) {
            return i;
        }
    }
    return -1;
};

/**
 * Check for user presence in a planning
 * @param {*} id the user id
 * @param {*} data the users object
 */
let exists = (id, data) => {
    for(var key in data) {
        if(data[key].id === id) {
            return true;
        }
    }
    return false;
};

/**
 * Check for user presence with status admin in a planning
 * @param {*} id the user id
 * @param {*} data the users object
 */
let existsWithRoleAdmin = (id, data) => {
    for(var key in data) {
        if(data[key].id === id && data[key].role === "admin") {
            return true;
        }
    }
    return false;
};

/**
 * Check for user presence with modification rights in a planning
 * @param {*} id the user id
 * @param {*} data the users object
 */
let existsWithModificationRight = (id, data) => {
    for(var key in data) {
        if(data[key].id === id && (data[key].role === "admin" || data[key].role === "member")) {
            return true;
        }
    }
    return false;
};



// ROUTES

//GET : TOUS LES PLANNINGS OF THE CONNECTED USER
router.get('/', function(req, res, next){
    const user_id = req.token.user;
    var array = []
    db.db.collection('plannings').get().then((snap) => {
        snap.forEach((doc) => {
            var data = doc.data()
            var users = data.users
            if(exists(user_id, users)) {
                data.id = doc.id;
                array.push(data);
            }               
        })
        res.json(array)
    }).catch( (err) => {
        console.log("Error : ", err)
        res.sendStatus(500);
    })
})

//GET : PLANNING AVEC L'ID DEMANDE
router.get('/:id', function(req, res, next){
   const user_id = req.token.user;
   db.db.collection('plannings').doc(req.params.id).get().then((doc) => {
        if (doc && doc.exists){
            var data = doc.data();
            if(exists(user_id, data.users)) {
                data.id = doc.id;
                res.json(doc.data())
            } else {
                res.status(403).json({"message": "Access denied"});
            }
        } else {
            res.status(400).json({"message": "No such document"})
        }
    }).catch( (err) => {
        console.log("Error : ", err)
        res.sendStatus(500);
    })
})

// CREATE A PLANNING FOR THE CONNECTED USER
router.post("/planning", (req, res, next) => {
    const user_id = req.token.user;
    var planning = {
        "name": "",
        "startDate": "",
        "endDate": "",
        "users": {},
        "tasks": [],
        "timeSlots": {}
    }
    var {name, startDate, endDate} = req.body;
    var message = {
        "invalidFields": []
    };

    // validation of inputs
    startDate = validator.checkDate(startDate);
    if(!startDate) {
        message.invalidFields.push("Require valid date format for [startDate]");
    }
    endDate = validator.checkDate(endDate);
    if(!endDate) {
        message.invalidFields.push("Require non empty [endDate]");
    }
    if(!name){
        message.invalidFields.push("Require non empty [name]");
    }
    if(message.invalidFields.length > 0) {
        res.status("400").json(message);
        return;
    }

    planning.endDate = endDate;
    planning.name = name;
    planning.startDate = startDate

    var userDocRef = db.db.collection("users").doc(user_id);
    var planningDocRef = db.db.collection("plannings").doc();

    db.db.runTransaction((transaction) => {
        return transaction.get(userDocRef).then((userDoc) => {
            if(!userDoc) return;
            var data = userDoc.data();
            planning.users[data.login] = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "role": "admin",
                "id": userDoc.id
            };
            
            var plannings = data.plannings;
            plannings[planningDocRef.id] = {
                "name": planning.name,
                "role": "admin"
            };

            transaction.set(planningDocRef, planning);
            transaction.update(userDocRef, {plannings: plannings});
            planning["id"] = planningDocRef.id;
            return res.json(planning);
        });
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    });
});

// ADD A USER TO THE PLANNING WITH ID EQUAL TO REQ.PARAMS.ID
router.put("/:id/member", (req, res, next) => {
    const user_id = req.token.user;
    const {login, role} = req.body;
    if(!validator.checkRole(role)) {
        res.status(400).send("Invalid role");
        return;
    }
    const id = req.params.id;
    var planningDocRef = db.db.collection("plannings").doc(id);
    var userDocRef = db.db.collection("users").where("login", "==", login);

    db.db.runTransaction( (transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists) {
                return res.status(404).json({"message": "No planning with id: [" + req.params.id + "]"});
            }
            var planningData = planningDoc.data();
            var {users, name} = planningData;

            if(!existsWithRoleAdmin(user_id, users)) {
                return res.status(403).json({"message": "No right to add members"});
            }

            if(login in users) {
                return res.status(403).json({"message": "User [" + login + "] already added"});
            }

            return transaction.get(userDocRef).then((snap) => {
                if(snap.empty) {
                    return res.status(400).json({"message": "Unregistered user: ["+ login +"]"});
                }
                snap.forEach((doc) => {
                    var {firstName, lastName, plannings} = doc.data();
                    users[login] = {
                        "lastName": lastName,
                        "firstName": firstName,
                        "role": role,
                        "id": doc.id
                    };
                    
                    plannings[planningDoc.id] = {
                        "name": name,
                        "role": role
                    };
                    
                    transaction.update(doc.ref, {plannings: plannings});
                    transaction.update(planningDocRef, {users: users});
                    planningData.users = users;
                })
                planningData.id = planningDoc.id;
                return res.json(planningData);
            })
        })
    }).catch( (error) => {
        res.sendStatus(500);
        console.log("Add member : " + error)
    })
});

/**
 * ADD A TASK TO THE PLANNING
 */
router.put("/:id/task", (req, res, next) => {
    const user_id = req.token.user;
    var {name, color, hoursExpected} = req.body;
    const id = req.params.id;

    hoursExpected = validator.checkNumber(hoursExpected);

    var planningDocRef = db.db.collection("plannings").doc(id);

    if(!name) {
        return res.status(400).json({"message": "Require non empty [name]"});
    }

    var newtask = {
        "name": name,
        "color": color,
        "hoursExpected": hoursExpected,
        "hoursDone": 0
    }

    if(!color) {
        delete newtask.color;
    }

    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists) {
                return res.status(404).json({"message": "Any occurrence for id [" + id + "]"});
            }

            var data  = planningDoc.data();
            var tasks = data.tasks;
            if(!existsWithModificationRight(user_id, data.users)) {
                return res.status(403).json({"message": "Access denied"});
            }
            var ok = getTaskIndex(name, tasks);
            if(ok !== -1) {
                return res.status(403).json({"message": "Task name already used in the planning"});
            }

            tasks.push(newtask);
            data.tasks = tasks;
            transaction.update(planningDocRef, {tasks: tasks});
            data["id"] = planningDoc.id;
            return res.json(data);
        })
    }).catch((error) => {
        console.log("ADD TASK: "+ error)
        res.sendStatus(500);
    });
});


/**
 * UPDATE PLANNING FIELDS
 */
router.patch("/:id", (req, res, next) => {
    const user_id = req.token.user;
    var {name, startDate, endDate} = req.body;
    var id = req.params.id;

    startDate = validator.checkDate(startDate);
    endDate = validator.checkDate(endDate);

    if(!name && !startDate && !endDate) {
        return res.status(400).json({
            "message": "This request require at least one of the following fields : name, endDate, startDate. Also make sure the format is correct."
        });
    }

    var planningDocRef = db.db.collection("plannings").doc(id);
    var userDocRef = db.db.collection("users").doc(user_id);

    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists) {
                return res.status(400).json({"message": "Any occurence for id: [" + id + "]"});
            }
            var data = planningDoc.data();
            if(!existsWithModificationRight(user_id, data.users)) {
                return res.status(403).json({"message": "Access denied"});
            }
            return transaction.get(userDocRef).then((userDoc) => {
                if(!userDoc.exists) return;
                var plans = userDoc.data().plannings;
                if(name) {
                    data.name = name;
                    plans[planningDoc.id].name = name;
                }
                if(startDate) {
                    data.startDate = startDate;
                }
                if(endDate) {
                    data.endDate = endDate;
                }
                transaction.update(userDocRef, {plannings : plans});
                transaction.update(planningDocRef, {
                    "name": data.name,
                    "startDate": data.startDate,
                    "endDate": data.endDate
                })
                data["id"] = planningDoc.id;
                return res.json(data);
            });
        })
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

/**
 * Modify task
 */
router.patch("/:id/task/:taskName", (req, res, next) => {
    const user_id = req.token.user;
    const {id, taskName} = req.params;
    var {name, hoursExpected, color} = req.body;

    hoursExpected = validator.checkNumber(hoursExpected);

    var message = [];

    if(!name && !hoursExpected && !color) {
        return res.status(400).json({
            "message": "This request require at least one of the following fields : name, hoursExpected, color. Also make sure the format is correct."
        });
    }

    var planningDocRef = db.db.collection("plannings").doc(id);
    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists){
                return res.status(404).json({"message": "Any occurrence of id [" + id + "]"});
            }

            var data = planningDoc.data();
            var tasks = data.tasks;
            if(!existsWithModificationRight(user_id, data.users)){
                return res.status(403).json({"message": "Access denied"});
            }
            var i = getTaskIndex(taskName, tasks);
            if(i === -1) {
                message.push("Any task with name [" + taskName + "]");
                return;
            }
            if(name) {
                tasks[i].name = name;
            }
            if(hoursExpected) {
                tasks[i].hoursExpected = hoursExpected;
            }
            if(color) {
                tasks[i].color = color;
            }
            transaction.update(planningDocRef, {tasks : tasks});
            data.tasks = tasks;
            data.id = planningDoc.id;
            return res.json(data);
        })
    }).catch((error) => {
        res.status(500).send("An error has occured. Sorry...")
        console.log("Modify task route: " +error);
    });

});

/**
 * GET /users/:idPlanning
 * Send a JSON of all users of a planning
 */
router.get('/users/:idPlanning', function(req, res, next){
    const user_id = req.token.user;
    db.db.collection('plannings')
    .doc(req.params.idPlanning)
    .get().then((doc) => {
        if(!doc.exists) return res.status(404).json({"message": "No such document"});
        const users = doc.data().users;
        if(exists(user_id, users)) {
            res.json(users);
        } else {
            res.status(403).json({"message": "Access denied"});
        }
    }).catch((err) => {
        console.log("Error getting document:", err);
        res.sendStatus(500);
    });
});

/**
 * DELETE /:idPlanning
 * Delete a planning
 */
router.delete('/:idPlanning', function(req, res, next){
    const user_id = req.token.user;
    var planningDocRef = db.db.collection('plannings').doc(req.params.idPlanning);
    var userDocRef = db.db.collection('users').doc(user_id);
    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists) return res.status(404).json({"message": "No such document"});
            var data = planningDoc.data();
            if(!existsWithRoleAdmin(user_id, data.users)) 
                return res.status(403).json({"message": "Access denied"});
            return transaction.get(userDocRef).then((userDoc) => {
                var plannings = userDoc.data().plannings;
                delete plannings[planningDoc.id];

                transaction.update(userDocRef, {plannings: plannings});
                transaction.delete(planningDocRef);
                res.sendStatus(204);
            });
             
        });
    }).catch((err) => {
        console.log("Error getting document:", err);
        res.sendStatus(500);
    });
});

/**
 * POST /:id/timeslot
 * Add a timeslot to a planning
 * :id = id of the planning
 * NEEDED in body : task name, endhour, starthour
 */
router.post('/:id/timeslot', function(req, res, next){
    var guid = validator.generateUniqueId();
    var id = req.params.id;
    var {task, startHour, endHour} = req.body;
    var message = {"invalidFields": []};

    var error = false;

    // validation of inputs
    task = validator.checkString(task); // to change
    if(!task){
        message.invalidFields.push("Require non empty for [task]");
    }
    startHour = validator.checkDate(startHour);
    if(!startHour){
        message.invalidFields.push("Require valid date format for [startHour]");
    }
    endHour = validator.checkDate(endHour);
    if(!endHour){
        message.invalidFields.push("Require valid date format for [endHour]");
    }
    if(message.invalidFields.length > 0){
        res.status(400).json(message);
        return;
    }

    // insertion
    var documentRef = db.db.collection('plannings').doc(id);
    db.db.runTransaction(t => {
        return t.get(documentRef)
            .then(doc => {
                if(!doc.exists){
                    error = true;
                    return true;
                }
            
                var timeSlotsDb = doc.data().timeSlots;
                timeSlotsDb[guid] = {
                    'task':task,
                    'startHour':startHour,
                    'endHour': endHour,
                    'done': false
                };
                t.update(documentRef, {timeSlots: timeSlotsDb});
                return timeSlotsDb;    
            });
    }).then(result => {
        if(result === true){
            res.sendStatus(400);
        }else{
            res.json(result);
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/**
 * PATCH /:id/timeslot/:idtimeslot
 * Modify a timeslot {task, done, startHour, endHour}
 */
router.patch('/:id/timeslot/:idtimeslot', function(req, res, next){
    var id = req.params.id;
    var idtimeslot = req.params.idtimeslot;
    var {task, done, startHour, endHour} = req.body;
    done = (done == 'true');
    
    startHour = validator.checkDate(startHour);
    endHour = validator.checkDate(endHour);

    if(!task && !done && !startHour && !endHour) {
        res.status(400).send("This request require at least one of the following fields : task, done, startHour, endHour. Also make sure the format is correct.")
        return;
    }

    var error = false;
    var planningDocRef = db.db.collection("plannings").doc(id);
    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef)
            .then(doc => {
                if(!doc.exists){
                    error = true;
                    return true;
                }
                var timeSlotsDb = doc.data().timeSlots;
                if(task) {
                    // rechercher task name dans les taches si existant
                    timeSlotsDb[idtimeslot].task = task;
                }
                if(done) {
                    // add stats : endhour - starthour + hoursRealised dans les task
                    timeSlotsDb[idtimeslot].done = done;
                }
                if(startHour) {
                    timeSlotsDb[idtimeslot].startHour = startHour;
                }
                if(endHour) {
                    timeSlotsDb[idtimeslot].endHour = endHour;
                }
                transaction.update(planningDocRef, {timeSlots: timeSlotsDb});
                return timeSlotsDb;
        })
    }).then((result) => {
        if(result === true)
            res.sendStatus(400);
        else
            res.json(result);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

/**
 * DELETE /:id/timeslot/:idtimeslot
 * Delete a timeslot of a planning
 */
router.delete('/:id/timeslot/:idtimeslot', function(req, res, next) {
    var idplanning = req.params.id;
    var idtimeslot = req.params.idtimeslot;

    var planningDocRef = db.db.collection('plannings').doc(idplanning);

    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef)
            .then(doc => {
                if(!doc.exists){
                    error = true;
                    return true;
                }
                
                var planning = doc.data();
                var timeSlotsDb = planning.timeSlots;
                delete timeSlotsDb[idtimeslot];
                transaction.update(planningDocRef, {timeSlots: timeSlotsDb});
                planning.timeSlots = timeSlotsDb;
                planning.id = doc.id;
                return planning;
        })
    }).then((result) => {
        if(result === true)
            res.sendStatus(400);
        else
            res.json(result);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;