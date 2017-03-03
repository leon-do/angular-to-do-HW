angular
    .module('myApp', [])
    .controller('myCtrl', getAPI)


function getAPI($http){
    var vm = this;

    //api call
    $http.get("/api").then(function(response){
        //console.log(response.data)

        var completeArray = [];
        var incompleteArray = [];
        
        //sort out complete vs incomplete
        for (var i = 0; i < response.data.length; i++){
            if (response.data[i].complete === true){
                completeArray.push({
                        phrase: response.data[i].phrase,
                        id : response.data[i]._id,
                        complete : true
                    }            
                )
            }
            else if (response.data[i].complete === false){
                incompleteArray.push({
                        phrase: response.data[i].phrase,
                        id : response.data[i]._id,
                        complete: false
                    }
                )                
            }
        }

        //display on screen
        vm.complete = completeArray
        vm.incomplete = incompleteArray
    })


    //when user clicks on incomplete...post to server.js
    vm.updateDB = function(id, complete){
        $http.post('/updateDB',{id:id, complete:complete}).success(function(data, status){
            console.log(status)
        })
    }


    //when user clicks on submit
    vm.createDb = function(userNote){
        // check if empty
        if (userNote !== undefined && userNote !== null && Object.keys(userNote).length !== 0){
            //if not empty, then post
            console.log(userNote)
            $http.post('/createDb',{userNote: userNote}).success(function(data, status){
                console.log(userNote)
            }) 
        }
    }



}