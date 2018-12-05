var express = require('express');
var router = express.Router();

router.get('/current', function(req, res, next) {
    res.json({
        "name": "admin",
        "login": "admin"
    })
});

module.exports = router;
