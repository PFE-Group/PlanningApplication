var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

// GET : USER COURANT
router.get('/current', function(req, res, next) {
    console.log("users/current");
    var obj = {}
    db.dbFirestore.collection("users").doc("3Jv3xT2Ti2s8aZHg2WsB").get().then( (doc) => {
        if (doc && doc.exists){
            var data = doc.data()
            for (var i in data){
                obj[i] = data[i]
            }

            obj["plannings"] = []
            data.plannings.forEach( (i) => {
                var temp = new Object();
                temp["id"] = i.planningID.id
                temp["role"] = i.role
                obj["plannings"].push(temp)
            })
            console.log(obj);
            res.json(obj)
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
    db.dbFirestore.collection("users").get().then( (snap) => {
        var j = 0;
        snap.forEach( (doc) => {
            var obj = {}
            var data = doc.data()
            for (var i in data){
                obj[i] = data[i]
            }

            obj["plannings"] = []
            if (data.plannings !== undefined){
                data.plannings.forEach( (i) => {
                    var temp = new Object();
                    temp["id"] = i.planningID.id
                    temp["role"] = i.role
                    obj["plannings"].push(temp)
                })
            }
            
            objjson["user " + j++] = obj
        })
        
        res.json(objjson)
    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

//GET : USER AVEC LE LOGIN DEMANDE
router.get('/:login', function(req, res, next) {
    var obj = {}
    db.dbFirestore.collection("users").get().then( (snap) => {
        snap.forEach( (doc) => {
            var data = doc.data()
            if (data["login"] === req.params.login){
                for (var i in data){
                    obj[i] = data[i]
                }
    
                obj["plannings"] = []
                if (data.plannings !== undefined){
                    data.plannings.forEach( (i) => {
                        var temp = new Object();
                        temp["id"] = i.planningID.id
                        temp["role"] = i.role
                        obj["plannings"].push(temp)
                    })
                }
                res.json(obj)
            }
        })

    }).catch( (err) => {
        console.log("Error getting document:", err);
    } )
});

module.exports = router;
