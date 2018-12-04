var express = require('express');
var router = express.Router();
const db = require('../modules/db.js');

router.get('/current', function(req, res, next) {
    db.dbFirestore.collection("users").doc("PtJYzOlbMUAyXjp7Dvkr").get().then( (doc) => {
        if (doc && doc.exists){
            res.json(doc.data())
        }else{
            console.log("No such document !")
        }
    }).catch( (err) => {
        console.log("Error getting document:", error);
    } )
});

module.exports = router;
