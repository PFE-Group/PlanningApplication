const path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'../../dist/client/index.html'));
});

router.get('/login', function(req, res){
    res.sendFile(path.join(__dirname,'../../dist/client/index.html'));
});

router.get('/schedule', function(req, res){
    res.sendFile(path.join(__dirname,'../../dist/client/index.html'));
});

router.get('/management', function(req, res){
    res.sendFile(path.join(__dirname,'../../dist/client/index.html'));
});

module.exports = router;