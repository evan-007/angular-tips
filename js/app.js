angular.module('waitstaffCalc', ['ngRoute'])

.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : './templates/home.html'
	})
	.when('/new-meal', {
		templateUrl : './templates/tips.html',
		controller: 'tipCtrl'
	})
	.when('/my-earnings', {
		templateUrl : './templates/earnings.html',
		controller : 'earningsCtrl'
	})
	.otherwise({redirectTo: '/'});
})

.controller('tipCtrl', function($scope, tipData){
  $scope.setData = function(){
    $scope.output = {};
    $scope.output.subtotal = ($scope.input.mealPrice + ($scope.input.mealPrice * $scope.input.taxRate/100));
    console.log($scope.output.subtotal);
    $scope.output.tip = ($scope.input.tipPercentage/100) *($scope.input.mealPrice);
    $scope.output.total = $scope.output.tip + $scope.output.subtotal;
  }
  
  $scope.clearInput = function(){
    $scope.input = '';
    $scope.output = '';
  }
})

.controller('earningsCtrl', function($scope, tipData){
  
})

.service('tipData', function(){
	return {};
});