var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const validator = require("../modules/validator.js");

const db = require('../modules/db.js');

/**
 * POST /login
 * Body -> email, password
 * Send a JSON with JWT and user data
 */
router.post('/login', function (req, res, next) {
    let user = {
        uid: "",
        email: req.body.email,
        password: req.body.password
    }

    var message = {
        "invalidFields": []
    };

    if (validator.checkString(user.password) === null) {
        message.invalidFields.push("Require no empty [password]")
    }

    if (!validator.checkEmail(user.email)) {
        message.invalidFields.push("Require valid [email]")
    }

    if (message.invalidFields.length > 0) {
        return res.status(400).json(message)
    }

    db.db.collection('users')
        .where("email", "==", user.email)
        .get()
        .then((snap) => {
            if (snap.size <= 0) {
                return res.status(401).json({
                    message: "user not found"
                })
            }
            snap.forEach((doc) => {
                var data = doc.data()
                bcrypt.compare(user.password, data.password, (err, result) => {
                    if (err) {
                        res.status(500).json(err)
                    } else {
                        if (!result) {
                            res.status(401).json({
                                message: "bad email/password"
                            })
                        } else {
                            user.id = doc.id
                            var exp = Date.now() + 12 * 60 * 60 * 1000;   // 12h
                            jwt.sign({ user: user.id, exp: exp }, jwtSecret, (err, token) => {
                                if (err) {
                                    res.status(500).json({
                                        message: "error during token signing"
                                    });
                                } else {
                                    delete data.password
                                    res.json({ jwt: token, user: data });
                                }
                            });
                        }

                    }
                })
                return;
            })

        }).catch((err) => {
            return res.status(500).json(err)
        })

})

/**
 * POST /register
 * Body -> email, password, firstName, lastName, login
 * Send a JSON with email, encrypted password, firstName, lastName, picture, email, plannings, id, login
 */
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

            var message = {
                "invalidFields": []
            };

            if (validator.checkString(user.email) === null || validator.checkString(user.firstName) === null
                || validator.checkString(user.lastName) === null || validator.checkString(user.login) === null) {
                message.invalidFields.push("Require no empty fields")
            }

            if (!validator.checkEmail(user.email)) {
                message.invalidFields.push("Require valid [email]")
            }

            db.db.collection('users').where("email", "==", user.email)
                .get()
                .then((snap) => {
                    if (snap.size > 0) {
                        message.invalidFields.push("Email already exists")
                    }

                    db.db.collection('users').where("login", "==", user.login)
                        .get()
                        .then((snap) => {
                            if (snap.size > 0) {
                                message.invalidFields.push("Login already exists")
                            }

                            if (message.invalidFields.length > 0) {
                                return res.status(400).json(message)
                            }

                            db.db.collection('users').add(user)
                                .then((userRef) => {
                                    user.id = userRef.id
                                    return res.status(200).json(user)
                                }).catch((err) => {
                                    return res.status(500).json(err)
                                })
                        })
                })
        }
    })
})

module.exports = router;