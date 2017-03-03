var mongoose = require('mongoose')
var serverJS = require('../server.js')

mongoose.connect('mongodb://localhost/testdb');

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