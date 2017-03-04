var mongoose = require('mongoose')
var serverJS = require('../server.js')

//https://www.youtube.com/watch?v=ZIu3joJRLzM
mongoose.connect('mongodb://heroku_nj250c2q:u75crcbccd9ljaquobt08sg2r7@ds117830.mlab.com:17830/heroku_nj250c2q' || 'mongodb://127.0.0.1:27017/testdb');

//make model
var angular2Do = mongoose.model("angular2DoCollection", {phrase:String, complete:Boolean})


//when user clicks update, convert complete from true to false
exports.mongoUpdate = function(data){
    angular2Do.findById(data.id, function(err, row){
        //chage from false --> true
        row.complete = true;
        row.save()
    })
}



//export mongoData for server.js
exports.mongoData = function(callback){
    //go to mongo and get all data
    angular2Do.find({}, function(err, data){
        // send to server.js
        callback(data)
    })
}


//when user clicks Add, add note to db
exports.mongoCreate = function(data){
    angular2Do({phrase: data.userNote, complete:false}).save()
}