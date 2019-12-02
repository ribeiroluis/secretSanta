var app = angular.module('secretSanta', []);
app.controller('controller', function ($scope) {
  $scope.names = [];
  $scope.isAvailableToSort = false;

  var localNames = localStorage.getItem('santaSecretParticipants');
  if (localNames != null) {
    $scope.names = JSON.parse(localNames);
  }


  $scope.checkKey = (e) => {
    if (e.keyCode == 13) {
      $scope.addName($scope.name);
    }
  };

  $scope.addName = (name) => {
    $scope.names.push({
      id: new Date().getTime(),
      name: name.toUpperCase(),
      selected: false,
      friend: null
    });
    $scope.name = undefined;
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
});