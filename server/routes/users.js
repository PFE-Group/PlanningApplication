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

//GET : TOUS LES USERS
router.get('/', function(req, res, next) {
    var objjson = {}
    firebase.firestore().collection("users").get().then( (snap) => {
        var j = 0;
        snap.forEach( (doc) => {
            var data = doc.data()
            objjson["user " + j++] = data
        })
        
        res.json(objjson)
    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

//GET : USER AVEC LE LOGIN DEMANDE
router.get('/:login', function(req, res, next) {
    firebase.firestore().collection("users")
    .where("login", "==", req.params.login)
    .get().then( (snap) => {
        snap.forEach( (doc) => {
            res.json(doc.data())
        })

    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

module.exports = router;
