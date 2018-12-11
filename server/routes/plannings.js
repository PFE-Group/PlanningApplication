var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

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
        "timeSlot": []
    }
    var {name, startDate, endDate} = req.body;
    var message = {
        "invalidFields": []
    };

    // validation of inputs
    if(!startDate) {
        message.invalidFields.push("Require non empty [startDate]");
    } else {
        startDate = new Date(startDate);
        if(isNaN(startDate.getTime())) {
            message.invalidFields.push("Require valid date format for [startDate");
        }
    }
    if(!endDate) {
        message.invalidFields.push("Require non empty [endDate]");
    } else {
        endDate = new Date(endDate);
        if(isNaN(endDate.getTime())) {
            message.invalidFields.push("Require valid date format for [endDate");
        }
    }
    if(!name){
        message.invalidFields.push("Require non empty [name]");
    }
    if(message.invalidFields.length > 0) {
        res.status("403").json(message);
        return;
    }

    planning.endDate = endDate.getTime();
    planning.name = name;
    planning.startDate = startDate.getTime();

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
    const login = req.body.login;
    const role = req.body.role;
    const id = req.params.id;
    console.log(login+":"+":"+role+":"+id)
    var planningDocRef = db.db.collection("plannings").doc(id);
    var userDocRef = db.db.collection("users").where("login", "==", login);
    db.db.runTransaction( (transaction) => {
        return transaction.get(planningDocRef).then( (planningDoc) => {
            if(!planningDoc.exists) {
                throw "No planning with id: [" + req.params.id + "]";
            }
            var {users, name} = planningDoc.data();
            if(login in users) {
                throw "User [" + login + "] already added";
            }
            
            return transaction.get(userDocRef).then( (snap) => {
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
                })
            })
        })
    }).then( () => {
        res.send("User successfully added");
    }).catch( (error) => {
        console.log(error)
        res.status(403).send("[Transaction failed]"+ error);
    })
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