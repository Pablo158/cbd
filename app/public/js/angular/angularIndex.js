var angularIndex = angular.module('angularIndex', []);

function indexController($scope, $http) {
    $scope.trips = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/trips')
        .success(function(data) {
            $scope.trips = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
}