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
	});
})

.controller('tipCtrl', function($scope, $rootScope){
	$scope.clear = function(){
		$scope.input = '';
		$rootScope.$broadcast('clearOutput');
	};
	$scope.setData = function(){
		console.log($scope.input);
		$rootScope.$broadcast('input', $scope.input);
	};
	$scope.$on('clearAll', function(event, data){
		$scope.input = '';
	});
})

.controller('resultsCtrl', function($scope, $rootScope) {
	$scope.output = {
		subtotal: 0,
		tip: 0,
		total: 0
	};
	$scope.$on('input', function(event, data){
		console.log(data);
		$scope.output = {
			subtotal: (data.taxRate/100 * data.mealPrice) + data.mealPrice,
			tip: (data.tipPercentage/100 * data.mealPrice),
			total: ((data.taxRate/100 * data.mealPrice) + data.mealPrice) + ((data.tipPercentage/100 * data.mealPrice))
		};
		$rootScope.$broadcast('output', $scope.output);
	});
	$scope.$on('clearAll', function(event, data) {
		$scope.output = {
			subtotal: 0,
			tip: 0,
			total: 0
		};
	});

	$scope.$on('clearOutput', function(event, data) {
		$scope.output = {
			subtotal: 0,
			tip: 0,
			total: 0
		};
	});
})

.controller('earningsCtrl', function($scope) {
	$scope.earnings = {
		tips: 0,
		meals: 0,
		average: 0
	};
	var count = 0;
	var total = 0;
	$scope.$on('output', function(event, data) {
		total = total+data.tip;
		count++;
		$scope.earnings = {
			tips: total,
			meals: count,
			average: total/count
		};
	});
	$scope.$on('clearAll', function(event, data) {
		$scope.earnings = {
			meals: 0,
			tips: 0,
			average: 0
		};
	});
})

.controller('clearCtrl', function($scope, $rootScope){
	$scope.clear = function() {
		$rootScope.$broadcast('clearAll');
	};
});