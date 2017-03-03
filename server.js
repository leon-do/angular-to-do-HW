var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());


var mongoJS = require('./app/mongo.js')



//display angular page
app.use(express.static(__dirname + "/app"));


//display mongodb api for client side to recieve
app.get('/api', function (req, res){
    //get data from mongo.js
    mongoJS.mongoData(function(data){
        //display data on localhost:3000/api
        //angular will go here to retrieve data
        res.send(data)
    })
})



//recieve post from client side (to move from incomplete to complete) and send updated data to mongo.js
app.post('/updateDB', function(req,res){
    mongoJS.mongoUpdate(req.body)
})


//recieve post from client side (to add note) and send updated data to mongo.js
app.post('/createDb', function (req, res){
    mongoJS.mongoCreate(req.body)
})




app.listen(process.env.PORT || 3000);