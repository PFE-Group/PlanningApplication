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
            data["planningId"] = doc.id;
            array.push(data)
        })
        res.json(array)
    }).catch( (err) => {
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

// CREATE A PLANNING FOR THE CONNECTED USER
router.post("/planning", (req, res, next) => {
    var planning = {
        "name": "",
        "startDate": "",
        "endDate": "",
        "users": {},
        "tasks": [],
        "timeSlots": {
            "version": 0
        }
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
                    
                    plannings.push({
                        "name": name,
                        "id": id,
                        "role": role
                    });
                    
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
            var ok = true;
            for(i in tasks) {
                if(tasks[i].name === name) {
                    ok = false; 
                    break;
                }
            }

            if(!ok) {
                message.invalidFields.push("Name already used in the planning");
                return;
            }

            tasks.push(newtask);
            data.tasks = tasks;
            transaction.update(planningDocRef, {tasks: tasks});
            
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

module.exports = router;