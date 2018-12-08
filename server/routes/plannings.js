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

module.exports = router;