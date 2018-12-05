var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

//GET : TOUS LES PLANNINGS
router.get('/', function(req, res, next){
    var objjson = {}
    db.dbFirestore.collection('plannings').get().then( (snap) => {
        var j = 0
        snap.forEach( (doc) => {
            var obj = {}
            var data = doc.data();
            for (var i in data){
                obj[i] = data[i]
            }

            obj["lessons"] = []
            obj["timeSlots"] = []
            obj["users"] = []

            data.lessons.forEach( (i) => {
                obj["lessons"].push(i)
            })

            data.timeSlots.forEach( (i) => {
                var temp = new Object()
                temp["done"] = i.done
                temp["endHour"] = i.endHour
                temp["lesson"] = i.lesson.id
                temp["starHour"] = i.starHour
                obj["timeSlots"].push(temp)
            })

            data.users.forEach( (i) => {
                obj["users"].push(i.userID.id)
            })
            objjson["planning " + j++] = obj
        })
        res.json(objjson)
    }).catch( (err) => {
        console.log("Error : ", err)
    })
})

//GET : PLANNING AVEC L'ID DEMANDE
router.get('/:id', function(req, res, next){
    var obj = {}
    db.dbFirestore.collection('plannings').doc(req.params.id).get().then((doc) => {
        if (doc && doc.exists){
            var data = doc.data();
            for (var i in data){
                obj[i] = data[i]
            }

            obj["lessons"] = []
            obj["timeSlots"] = []
            obj["users"] = []

            data.lessons.forEach( (i) => {
                obj["lessons"].push(i)
            })

            data.timeSlots.forEach( (i) => {
                var temp = new Object()
                temp["done"] = i.done
                temp["endHour"] = i.endHour
                temp["lesson"] = i.lesson.id
                temp["starHour"] = i.starHour
                obj["timeSlots"].push(temp)
            })

            data.users.forEach( (i) => {
                obj["users"].push(i.userID.id)
            })

            res.json(obj)
        }else{
            console.log("No such document")
        }
    }).catch( (err) => {
        console.log("Error : ", err)
    })
})

module.exports = router;