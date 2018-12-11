var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');
const validator = require("../modules/validator.js");

//GET : TOUS LES PLANNINGS => A changer
router.get('/', function(req, res, next){
    var array = []
    db.db.collection('plannings').get().then( (snap) => {
        snap.forEach( (doc) => {
            var data = doc.data()
            data["id"] = doc.id;
            array.push(data)
        })
        res.json(array)
    }).catch((err) => {
        console.log("Error : ", err)
        res.status(500).send("An error has occurred")
    })
})

//GET : PLANNING AVEC L'ID DEMANDE
router.get('/:id', function(req, res, next){
   db.db.collection('plannings').doc(req.params.id).get().then((doc) => {
        if (doc && doc.exists){
            res.json(doc.data())
        }else{
            console.log("No such document")
        }
    }).catch( (err) => {
        console.log("Error : ", err)
    })
})

/**
 * GET /users/:iduser
 * Send a JSON containing all the plannings (admin) of a user
 */
router.get('/user/:iduser', function(req, res, next) {
    var iduser = req.params.iduser;
    var message = {"invalidFields": []};

    // validation of inputs
    iduser = validator.checkString(iduser);
    if(!iduser) {
        message.invalidFields.push("Require non empty [iduser]");
    }

    
    db.db.collection('users')
    .doc(iduser)
    .get().then((doc) => {
        var o = {};
        var arrPlannings = doc.data().plannings;
        arrPlannings.forEach((p) => {
            if(p.role === 'admin'){
                o[p.planningID] = {};
            }
        })
        return o;
    }).then((result) => {
        var ids = Object.keys(result);
        for(var id of ids){
            db.db.collection('plannings').doc(id).get().then((doc) => {
                result[id] = doc.data();
                res.json(result);
            })
        }
    }).catch((err) => {
        console.log(error);
        res.status(500).send("An error has occurred. Sorry...")
    })
});

// CREATE A PLANNING FOR THE CONNECTED USER
router.post("/planning", (req, res, next) => {
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
    planning.startDate = startDate;

    // insertion
    db.db.collection("plannings").add(planning)
    .then((docRef)  => {
        planning["id"] = docRef.id;
        res.json(planning)
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        res.status(500).send("Unknown error. Sorry...");
        console.log(error);
    });
});

// ADD A USER TO THE PLANNING WITH ID EQUAL TO REQ.PARAMS.ID
router.put("/:id/member", (req, res, next) => {
    // TODO : once authentication done; check whether the connected user is member of the document with a status different from "guest"
    const {login, role} = req.body;
    if(!validator.checkRole(role)) {
        res.status(400).send("Invalid role");
        return;
    }
    const id = req.params.id;
    var planningDocRef = db.db.collection("plannings").doc(id);
    var userDocRef = db.db.collection("users").where("login", "==", login);
    db.db.runTransaction( (transaction) => {
        return transaction.get(planningDocRef).then( (planningDoc) => {
            if(!planningDoc.exists) {
                throw "No planning with id: [" + req.params.id + "]";
            }
            var planningData = planningDoc.data();
            var {users, name} = planningData;
            if(login in users) {
                throw "User [" + login + "] already added";
            }
            
            return transaction.get(userDocRef).then((snap) => {
                if(snap.empty) {
                    throw "Unregistered user: ["+ login +"]";
                }
                snap.forEach( (doc) => {
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

                return planningData;
            })
        })
    }).then( (planning) => {
        res.json(planning)
    }).catch( (error) => {
        res.status(500).send("An error has occurred");
        console.log("Add member : " + error)
    })
});

/**
 * ADD A TASK TO THE PLANNING
 */
router.put("/:id/task", (req, res, next) => {
    var {name, color, hoursExpected} = req.body;
    const id = req.params.id;

    var message = {
        "invalidFields": []
    };
    hoursExpected = validator.checkNumber(hoursExpected);

    var planningDocRef = db.db.collection("plannings").doc(id);

    if(!name) {
        message.invalidFields.push("Require non empty [name]");
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
                message.invalidFields.push("Any occurrence for id [" + id + "]");
                return;
            }
            var data  = planningDoc.data();
            var tasks = data.tasks;
            var ok = getTaskIndex(name, tasks);
            if(ok !== -1) {
                message.invalidFields.push("Name already used in the planning");
                return;
            }

            tasks.push(newtask);
            data.tasks = tasks;
            transaction.update(planningDocRef, {tasks: tasks});
            data["id"] = planningDoc.id;
            return data;
        })
    }).then((planning) => {
        if(message.invalidFields.length > 0){
            res.status("400").json(message);
        } else {
            res.json(planning);
        }
    }).catch((error) => {

    });
});


/**
 * UPDATE PLANNING FIELDS
 * MISSING CHECKS
 */
router.patch("/:id", (req, res, next) => {
    var {name, startDate, endDate} = req.body;
    var id = req.params.id;

    startDate = validator.checkDate(startDate);
    endDate = validator.checkDate(endDate);

    if(!name && !startDate && !endDate) {
        res.status(400).send("This request require at least one of the following fields : name, endDate, startDate. Also make sure the format is correct.")
        return;
    }

    var error = false;
    var planningDocRef = db.db.collection("plannings").doc(id);

    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists) {
                error = true;
                return;
            }
            var data = planningDoc.data();
            if(name) {
                data.name = name;
                // HERE UPDATE CONNECTED USER DATA
            }
            if(startDate) {
                data.startDate = startDate;
            }
            if(endDate) {
                data.endDate = endDate;
            }
            transaction.update(planningDocRef, {
                "name": data.name,
                "startDate": data.startDate,
                "endDate": data.endDate
            })
            data["id"] = planningDoc.id;
            return data;
        })
    }).then((planning) => {
        if(error) {
            res.status("404").send("Any occurence for id: [" + id + "]");
        } else {
            res.json(planning);
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).send("An error has occurred. Sorry...")
    });
});

/**
 * Modify task
 */
router.patch("/:id/task/:taskName", (req, res, next) => {
    const {id, taskName} = req.params;
    var {name, hoursExpected, color} = req.body;

    hoursExpected = validator.checkNumber(hoursExpected);

    var message = [];

    if(!name && !hoursExpected && !color) {
        res.status(400).send("This request require at least one of the following fields : name, hoursExpected, color. Also make sure the format is correct.")
        return;
    }

    var planningDocRef = db.db.collection("plannings").doc(id);
    db.db.runTransaction((transaction) => {
        return transaction.get(planningDocRef).then((planningDoc) => {
            if(!planningDoc.exists){
                message.push("Any occurrence of id [" + id + "]")
                return;
            }

            var data = planningDoc.data();
            var tasks = data.tasks;
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
            return data;
        })
    }).then((planning) =>{
        if(!planning) {
            res.status(404).json(message);
        } else {
            res.json(planning);
        }
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
    db.db.collection('plannings')
    .doc(req.params.idPlanning)
    .get().then((doc) => {
        res.json(doc.data().users);
    }).catch((err) => {
        console.log("Error getting document:", err);
    });
});

/**
 * DELETE /:idPlanning
 * Delete a planning
 */
router.delete('/:idPlanning', function(req, res, next){
    db.db.collection('plannings')
    .doc(req.params.idPlanning)
    .delete().then(() => {
        // 204 No Content - Response to a successful request that won't be returning a body (like a DELETE request)
        res.sendStatus(204); 
        console.log("Planning", req.params.idPlanning, "has been deleted");
    }).catch((err) => {
        console.log("Error getting document:", err);
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


let getTaskIndex = (exname, tasks) => {
    for(i in tasks) {
        if(tasks[i].name === exname) {
            return i;
        }
    }
    return -1;
};

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
                var timeSlotsDb = doc.data().timeSlots;
                delete timeSlotsDb[idtimeslot];
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
    })
});

module.exports = router;