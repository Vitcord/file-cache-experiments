angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('FileDemoController', function(){
  var vm = this;
  vm.result = {};

  vm.read = function(){
    function readFromFile(fileName, cb) {
      var pathToFile = cordova.file.dataDirectory + fileName;
      window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();

          reader.onloadend = function (e) {
            console.log(e);
            console.log(this);

            cb(JSON.parse(this.result));
          };

          reader.readAsText(file);
        }, errorHandler.bind(null, fileName));
      }, errorHandler.bind(null, fileName));
    }

    // var fileData;
    readFromFile('data.json', function (data) {
      // fileData = data;
      vm.result.data = data;
    });

  };

  vm.write = function(){
    function writeToFile(fileName, data) {
      data = JSON.stringify(data, null, '\t');
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function (e) {
                            // for real-world usage, you might consider passing a success callback
                            console.log('Write of file "' + fileName + '"" completed.');
                          };

                          fileWriter.onerror = function (e) {
                            // you could hook this up with our global error handler, or pass in an error callback
                            console.log('Write failed: ' + e.toString());
                          };

                          var blob = new Blob([data], { type: 'text/plain' });
                          fileWriter.write(blob);
                        }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
          }, errorHandler.bind(null, fileName));
    };

    writeToFile('data.json', { foo: 'bar' });
  };

  var errorHandler = function (fileName, e) {
      var msg = '';

      switch (e.code) {
          case FileError.QUOTA_EXCEEDED_ERR:
              msg = 'Storage quota exceeded';
              break;
          case FileError.NOT_FOUND_ERR:
              msg = 'File not found';
              break;
          case FileError.SECURITY_ERR:
              msg = 'Security error';
              break;
          case FileError.INVALID_MODIFICATION_ERR:
              msg = 'Invalid modification';
              break;
          case FileError.INVALID_STATE_ERR:
              msg = 'Invalid state';
              break;
          default:
              msg = 'Unknown error';
              break;
      };

      console.log('Error (' + fileName + '): ' + msg);
  }
})

;
