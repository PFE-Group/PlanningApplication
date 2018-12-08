var express = require('express');
var router = express.Router();
const firebase = require('firebase-admin')

//GET : TOUS LES PLANNINGS
router.get('/', function(req, res, next){
    var objjson = {}
   firebase.firestore().collection('plannings').get().then( (snap) => {
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
   firebase.firestore().collection('plannings').doc(req.params.id).get().then((doc) => {
        if (doc && doc.exists){
            res.json(doc.data())
        }else{
            console.log("No such document")
        }
    }).catch( (err) => {
        console.log("Error : ", err)
    })
})


router.put("/:id/member", (req, res, next) => {
    const login = req.body.login;
    const role = req.body.role;
    const id = req.params.id;
    var planningDocRef = db.dbFirestore.collection("plannings").doc(id);
    var userDocRef = db.dbFirestore.collection("users").where("login", "==", login);
    db.dbFirestore.runTransaction( (transaction) => {
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
                    console.log(plannings)
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
        res.send("HELLO FROM SERVER")
    }).catch( (error) => {
        res.send("[Transaction failed]"+ error);
    })
});

module.exports = router;