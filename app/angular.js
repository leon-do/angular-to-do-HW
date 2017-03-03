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


    //when user clicks on incomplete...
    vm.updateDB = function(id, complete){
        $http.post('/userClicked',{id:id, complete:complete}).success(function(data, status){
            console.log(status)
        })
    }



}