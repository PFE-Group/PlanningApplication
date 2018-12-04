const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello it\'s the server');
});

app.listen(4000, function(){
    console.log('Server is running');
});