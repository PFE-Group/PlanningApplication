var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

//FIREBASE VS FIREBASE-ADMIN, QUE CHOISIR ?
const firebase = require('firebase-admin')

router.post('/login', function(req, res, next){
    let user = {
        uid : "",
        email : req.body.email,
        password : req.body.password
    }

    firebase.firestore().collection('users')
        .where("email", "==", user.email)
        .get()
        .then( (snap) => {
            snap.forEach( (doc) => {
                user.uid = doc.id
            })
            firebase.auth().createCustomToken(user.uid)
                .then( (customToken) => {
                    res.json(customToken)
                }).catch( (err) => {
                    res.status(403).json(err)
                })
        }).catch( (err) => {
            res.status(403).json(err)
        })
    
})

router.post('/register', function(req, res, next){
    let user = {
        email : req.body.email,
        password : req.body.password,
        firstName : "testFirstName",
        lastName : "testLastName",
        login : "testLogin2",
        picture : "",
        plannings : ""
    }
    firebase.auth().createUser(user)
        .then( (result) => {
            firebase.firestore().collection('users').doc(result.uid).set(user)
            .then( (user) =>{
                res.json(user)
            }).catch( (err) => {
                res.status(401).json(err)
            })
        })
        .catch( (err) => {
            res.status(403).json(err)
        })
})

module.exports = router;