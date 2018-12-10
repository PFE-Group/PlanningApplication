var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

const firebase = require('firebase-admin')

router.post('/login', function (req, res, next) {
    let user = {
        uid: "",
        email: req.body.email,
        password: req.body.password
    }

    firebase.firestore().collection('users')
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
                            return res.status(401).send({
                                message: "bad email/password"
                            })
                        } else {
                            user.uid = doc.id
                            var additionalClaims = {
                                firstName: data.firstName,
                                lastName: data.lastName,
                                login: data.login
                            }
                            firebase.auth().createCustomToken(user.uid, additionalClaims)
                                .then((customToken) => {
                                    data.password = ""
                                    return res.status(200).send({
                                        customToken : customToken,
                                        user : data
                                    })
                                }).catch((err) => {
                                    return res.status(403).send(err)
                                })
                        }

                    }
                })

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
                plannings: []
            }
            firebase.auth().createUser(user)
                .then((result) => {
                    firebase.firestore().collection('users').doc(result.uid).set(user)
                        .then((userFound) => {
                            return res.status(200).send(userFound)
                        }).catch((err) => {
                            return res.status(401).send(err)
                        })
                })
                .catch((err) => {
                    return res.status(403).send(err)
                })
        }
    })
})

router.post('/verifyToken', function(req, res, next) {
    firebase.auth().verifyIdToken(req.body.idToken)
        .then( (decodedToken) => {
            console.log("decoded token : ", decodedToken)
            return res.status(200).send(decodedToken)
        })
        .catch( (err) => {
            return res.status(403).send(err)
        })
})

module.exports = router;
