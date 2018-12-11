var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
const db = require('../modules/db.js');
const firebase = require("firebase-admin");

router.post('/login', function (req, res, next) {
    let user = {
        uid: "",
        email: req.body.email,
        password: req.body.password
    }

    db.db.collection('users')
        .where("email", "==", user.email)
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                bcrypt.compare(user.password, doc.data().password, (err, result) => {
                    if (err) {
                        res.status(500).json(err)
                    } else {
                        if (!result) {
                            res.status(401).json({
                                message: "bad email/password"
                            })
                        } else {
                            user.uid = doc.id
                            firebase.auth().createCustomToken(user.uid)
                                .then((customToken) => {
                                    res.json(customToken)
                                }).catch((err) => {
                                    res.status(403).json(err)
                                })
                        }

                    }
                })

            })

        }).catch((err) => {
            res.status(403).json(err)
        })

})

router.post('/register', function (req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json(err)
        } else {
            let user = {
                email: req.body.email,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                login: req.body.login,
                picture: "",
                plannings: {}
            }
            firebase.auth().createUser(user)
                .then((result) => {
                    db.db.collection('users').doc(result.uid).set(user)
                        .then((userFound) => {
                            res.json(userFound)
                        }).catch((err) => {
                            res.status(401).json(err)
                        })
                })
                .catch((err) => {
                    res.status(403).json(err)
                })
        }
    })


})

module.exports = router;