var app = angular.module('secretSanta', []);
app.controller('controller', function ($scope) {
  $scope.name = undefined;
  $scope.names = [];
  $scope.isAvailableToSort = false;

  var localNames = localStorage.getItem('santaSecretParticipants');
  if (localNames != null) {
    $scope.names = JSON.parse(localNames);
  }


  $scope.checkKey = (e, name) => {
    if (e.keyCode == 13) {
      $scope.addName(name);

    }
  };

  $scope.addName = (name) => {
    if (!$scope.$$phase) {
      $scope.$apply();
    }
    $scope.names.push({
      id: new Date().getTime(),
      name: name.toUpperCase(),
      selected: false,
      friend: null
    });
    $scope.$$childHead.name = undefined;
    // $scope.name = undefined;
    localStorage.setItem('santaSecretParticipants', JSON.stringify($scope.names));
  }
  $scope.removeName = (index) => {
    $scope.names.splice(index, 1);
    localStorage.setItem('santaSecretParticipants', JSON.stringify($scope.names));
  }
  $scope.prepareToSort = () => {
    $scope.names.forEach(e => {
      e.selected = false;
      e.friend = null;
    });
    $scope.isAvailableToSort = !$scope.isAvailableToSort;
  };

  $scope.getNameToSort = () => {

  };

  $scope.sort = () => {
    var index = 1;

    var interval = setInterval(() => {
      switch (index) {
        case 1:
          $scope.sortedName = "Procurando o amigo ideal"; break;
      }
      index++;

      if(index > 3){
        clearInterval(interval);
      }
      $scope.$apply();      
    }, 1000);
  };
});