angular.module('starter.controllers', [])

.controller('DashCtrl',function($scope,$rootScope) {
  
  $rootScope.$on('setbg', function(event, urlString) { 
  console.log("******************");
   document.getElementById('hometab').style["background-image"]= urlString ; 
 });

})

.controller('ChatsCtrl', function(Chats,$scope, $stateParams, $rootScope ) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
   $scope.gotoGallary =function(chatId){
        var chatobj =  Chats.get(chatId);
        
        var urlString = 'url(' + chatobj.face + ')';
        if($stateParams.setbgflag)
         {
           document.getElementById('galtab').style["background-image"]= urlString ;
           $rootScope.$emit('setbg', urlString);
           $stateParams.setbgflag =false;
          }
   }
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

   $scope.gotoGallary =function(chatId){
        $scope.backgroundImage = Chats.get(chatId); 
   }


})
/*.service('saveFile',['$http',function($http) {

  this.save=function(argument) {
    $http({
            url: "",
            method: "POST",
            data: data,
            headers: {'Content-Type': undefined}
        }).success(function (response) {
            callback(response);
        });
    };
  
}])*/
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])
.controller('AccountCtrl'/*,['saveFile', function($scope,saveFile) {*/, ['$scope', 'fileUpload', '$state','$rootScope',
  function($scope, fileUpload,$state ,$rootScope)  {
    $scope.settings = {
    enableFriends: true
  };
  $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

  $scope.gotoGallary = function(flag) {
    // body...
    $state.go("tab.chats" ,{ "setbgflag" : flag });
  };

   $rootScope.$on('setbg', function(event, urlString) { 
      console.log("******************");
       document.getElementById('accounttab').style["background-image"]= urlString ; 
     });


 /* $scope.uploadPicture =function() {
      var obj =document.getElementById("image-file").files[0];
      saveFile.save(obj);
      var fso = new ActiveXObject("Scripting.FileSystemObject"); 
      fso.CopyFile(obj, "../img/"+obj.name, 1);  
      console.log($scope.myFile);
      console.log(obj);
  };*/
}]);
