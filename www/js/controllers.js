angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('DataController', function($scope, $q) {

  // do data call here to a provider or a service within this page lifecycle
  $scope.$on('$ionicView.beforeEnter', function() {
    init();
  });

  function init() {
    Provider.getData().then(function(data) {
      $scope.playlists = data;
    })
  }

  // mimick a real service and send data async using $q lib
  var Provider = {
    getData: function() {
      var dfd = $q.defer();

      dfd.resolve([{
        title: 'Reggae',
        id: 1
      }, {
        title: 'Chill',
        id: 2
      }, {
        title: 'Dubstep',
        id: 3
      }, {
        title: 'Indie',
        id: 4
      }, {
        title: 'Rap',
        id: 5
      }, {
        title: 'Cowbell',
        id: 6
      }]);

      return dfd.promise;
    }
  }
})

.controller('CameraCtrl', function($scope, $q, $ionicPlatform, $ionicActionSheet, $cordovaCamera) {

  $scope.getPicture = function() {
    Provider.promptForImage({
      showDestructive: true
    }).then(function(image) {
      $scope.photo = image;
    });
  }

  var Provider = {
    promptForImage: function(options) {
      var dfd = $q.defer();

      $ionicPlatform.ready(function() {
        $ionicActionSheet.show({
          buttons: [{
            text: 'Take photo'
          }, {
            text: 'Photo from library'
          }],
          destructiveText: options.showDestructive ? 'Remove this photo' : '',
          titleText: 'Edit photo',
          cancelText: 'Cancel',
          cancel: function() {
            return;
          },
          buttonClicked: function(index) {

            // for local dev
            if (!window.cordova) {
              var exampleImage = 'data:image/jpeg;base64,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'
              dfd.resolve(exampleImage);
              return true;
            } else {
              switch (index) {
                case 0:
                  var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                  };

                  $cordovaCamera.getPicture(options).then(function(imageData) {
                    dfd.resolve("data:image/jpeg;base64," + imageData);
                    return true;
                  }, function(err) {
                    // error
                  });


                case 1:

                  var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                  };

                  $cordovaCamera.getPicture(options).then(function(imageData) {
                    dfd.resolve("data:image/jpeg;base64," + imageData);
                    return true;
                  }, function(err) {
                    // error
                  });
              }
            }
          },
          destructiveButtonClicked: function() {
            dfd.resolve(null);
            return true;
          }
        });
      }, false);

      return dfd.promise;
    }

  }

});
