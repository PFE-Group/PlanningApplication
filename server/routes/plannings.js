var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

//GET : TOUS LES PLANNINGS
router.get('/', function(req, res, next){
    var objjson = {}
    db.db.collection('plannings').get().then( (snap) => {
        var j = 0
        snap.forEach( (doc) => {
            objjson["planning " + j++] = doc.data()
        })
        res.json(objjson)
    }).catch( (err) => {
        console.log("Error : ", err)
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
    var planningDocRef;
    var userDocRef;
});

// ADD A USER TO THE PLANNING WITH ID EQUAL TO REQ.PARAMS.ID
router.put("/:id/member", (req, res, next) => {
    // TODO : once authentication done; check whether the connected user is member of the document with a status different from "guest"
    const login = req.body.login;
    const role = req.body.role;
    const id = req.params.id;
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
        res.status(403).send("[Transaction failed]"+ error);
    })
});

module.exports = router;