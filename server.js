var express = require('express');
var app = express();

app.use('/fiveboard', express.static(__dirname + "/fiveboard"));


app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/test.html', function(req, res){
    res.sendfile('test.html');
});

app.get('/fiveboard', function(req, res){
    res.sendfile('fiveboard/index.html');
});



app.listen('3001', function(){
  console.log("Server online sulla porta 3001");
});