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
  $scope.output = {};
  
  $scope.setData = function(){
    $scope.output.subtotal = ($scope.input.mealPrice + ($scope.input.mealPrice * $scope.input.taxRate/100));
    console.log($scope.output.subtotal);
    $scope.output.tip = ($scope.input.tipPercentage/100) *($scope.input.mealPrice);
    $scope.output.total = $scope.output.tip + $scope.output.subtotal;
    tipData.tip = $scope.output.tip;
    tipData.count = ++tipData.count;
    tipData.total = tipData.total + $scope.output.tip;
    console.log(tipData);
  }
  
  $scope.clearInput = function(){
    $scope.input = '';
    $scope.output = '';
  }
})

.controller('earningsCtrl', function($scope, tipData){
  $scope.earnings = {};
  $scope.earnings.tips = tipData.total;
  $scope.earnings.meals = tipData.count;
  $scope.earnings.average = $scope.earnings.tips / $scope.earnings.meals;
  
  $scope.clearAll = function(){
    tipData.tip = 0;
    tipData.count = 0;
    tipData.total = 0;
    $scope.earnings = '';
  };
})

.service('tipData', function(){
	return {
    tip: 0,
    count: 0,
    total: 0
  };
});