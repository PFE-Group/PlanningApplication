var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

/**
 * GET /current
 * Header must contain jwt
 * Send a JSON with data of the user logged in
 */
router.get('/current', function(req, res, next) {
    db.db.collection("users").doc(req.token.user).get().then( (doc) => {
        if (doc && doc.exists){
            res.json(doc.data())
        }else{
            console.log("No such document !")   
            res.sendStatus(401);
        }
    }).catch( (err) => {
        console.log("Error getting document:", err);
        res.sendStatus(500)
    })
});

/**
 * GET /:login
 * Params -> login
 * Send a JSON with data of a user
 */
/*router.get('/:login', function(req, res, next) {
    db.db.collection("users")
    .where("login", "==", req.params.login)
    .get().then( (snap) => {
        snap.forEach( (doc) => {
            res.json(doc.data())
        })
        console.log(snap.size);
    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});*/

/**
 * GET /plannings/
 * Send an array into a JSON of all plannings of a user
 */
/*
 router.get('/plannings/', function(req, res, next){
    console.log(req.token);
    db.db.collection('users')
    .doc(req.token.user).get()
    .then((doc) => {
        var promises = [];
        var arr = doc.data().plannings;
        var b = [];

        arr.forEach((p) =>{
            promises.push(db.db.collection('plannings')
            .doc(p.planningID).get()
            .then((doc) => {
                b.push(doc.data());
                console.log(doc.data().id);
            }).catch((err) => {
                console.log("Error getting document:", err);
            }));
        });
        
        Promise.all(promises).then(() =>
            res.json(b)
        );
    }).catch((err) => {
        console.log("Error getting document:", err);
    });
});
*/

/**
 * GET /
 * Send an array into a JSON of all users with their first name, last name, email and login
 */
/*
router.get('/', function(req, res, next) {
    var arr = [];
    var i = 0;
    db.db.collection("users").get().then((snap) => {
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
        res.status(500).send("Oups an error has occurred");
    });
});
*/

module.exports = router;
