var app = angular.module('secretSanta', []);
app.controller('controller', function ($scope) {
  $scope.name = undefined;
  $scope.names = [];
  $scope.isAvailableToSort = false;
  $scope.index = 0;

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
    saveData($scope.names);
  }
  $scope.removeName = (index) => {
    $scope.names.splice(index, 1);
    saveData($scope.names);
  }

  $scope.checkIsEnd = () => {
    var v = $scope.names.filter(f => f.friend == null);
    return v.length > 0;
  }

  function saveData(names) {
    localStorage.setItem('santaSecretParticipants', JSON.stringify($scope.names));
  }


  $scope.prepareToSort = () => {
    // $scope.names.forEach(e => {
    //   e.selected = false;
    //   e.friend = null;
    // });
    $scope.index = 0;
    $scope.sortedName = undefined;
    $scope.person = getRandomItem($scope.names);
    if ($scope.person) {
      $scope.isAvailableToSort = true;
    } else {
      $scope.isAvailableToSort = false;
    }
  };

  function getRandomItem(arr) {
    var items = arr.filter(f => f.friend == null);
    return items[Math.floor(Math.random() * items.length)];
  }

  function getFriend(arr, person) {
    var items = arr.filter(f => f.selected == false && f.id != person.id);
    return items[Math.floor(Math.random() * items.length)];
  }

  $scope.sort = (person) => {
    $scope.index = 1;
    $scope.sortedName = "5";
    animateCSS('.sortedName', 'fadeInDown')
    var interval = setInterval(() => {
      switch ($scope.index) {
        case 1:
          $scope.sortedName = "4";
          animateCSS('.sortedName', 'fadeInUp')
          break;
        case 2:
          $scope.sortedName = "3";
          animateCSS('.sortedName', 'fadeInLeft')
          break;
        case 3:
          $scope.sortedName = "2";
          animateCSS('.sortedName', 'fadeInRight')
          break;
        case 4:
          $scope.sortedName = "1";
          animateCSS('.sortedName', 'heartBeat')
          break;
        case 5:
          var friend = getFriend($scope.names, person);
          friend.selected = true;
          $scope.sortedName = friend.name;
          person.friend = friend.name;
          animateCSS('.sortedName', 'fadeIn');
          animateCSS('.sortedName', 'delay-1s');
          break;
      }

      $scope.index++;

      if ($scope.index > 5) {
        clearInterval(interval);
        var x = document.getElementById("sound");
        x.play();
      }
      $scope.$apply();
      saveData($scope.names);
    }, 1000);
  };

  function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }
});