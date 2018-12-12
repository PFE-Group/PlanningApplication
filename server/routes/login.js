var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const db = require('../modules/db.js');

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
            if (snap.size <= 0){
                return res.status(403).send({
                    message : "user not found"
                })
            }
            snap.forEach((doc) => {
                var data = doc.data()
                bcrypt.compare(user.password, data.password, (err, result) => {
                    if (err) {
                        return res.status(500).send(err)
                    } else {
                        if (!result) {
                            /*return res.status(401).send({
                                message: "bad email/password"
                            })*/
                            return;
                        } else {
                            user.id = doc.id
                            var exp = Date.now() + 12 * 60 * 60 * 1000;   // 12h
                            console.log(jwtSecret)
                            jwt.sign({ user: user.id, exp: exp }, jwtSecret, (err, token) => {
                                if (err) {
                                    res.status(500).send({
                                        message : "error during token signing"
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
            return res.status(403).send(err)
        })

})

router.post('/register', function (req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send(err)
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
            db.db.collection('users').add(user)
                .then((userRef) => {
                    user.id = userRef.id
                    return res.status(200).json(user)
                }).catch((err) => {
                    return res.status(401).send(err)
                })
        }
    })
})

module.exports = router;