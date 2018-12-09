var express = require('express');
var router = express.Router();
const firebase = require('firebase-admin')

// GET : USER COURANT
router.get('/current', function(req, res, next) {
    firebase.firestore().collection("users").doc("3Jv3xT2Ti2s8aZHg2WsB").get().then( (doc) => {
        if (doc && doc.exists){
            res.json(doc.data())
        }else{
            console.log("No such document !")
        }
    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

/**
 * GET /
 * Return an array as a JSON of all users with their first name, last name, email and login
 */
router.get('/', function(req, res, next) {
    var arr = [];
    var i = 0;
    db.dbFirestore.collection("users").get().then((snap) => {
        snap.forEach((doc) => {
            var data = doc.data();
            arr[i++] = { 
                firstName: data.firstName, 
                lastName: data.lastName,
                email: data.email,
                login: data.login
            };
        })
        res.json(arr);
    }).catch((err) => {
        console.log("Error getting document:", err);
    });
});

//GET : USER AVEC LE LOGIN DEMANDE
router.get('/:login', function(req, res, next) {
    firebase.firestore().collection("users")
    .where("login", "==", req.params.login)
    .get().then( (snap) => {
        snap.forEach( (doc) => {
            res.json(doc.data())
        })
        console.log(snap.size);
    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

module.exports = router;
