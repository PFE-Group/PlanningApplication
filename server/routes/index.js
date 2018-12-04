var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Hello it\'s the server');
});

module.exports = router;