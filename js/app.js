angular.module('waitstaffCalc', [])

.controller('tipCtrl', function($scope, $rootScope){
	$scope.clear = function(){
		$scope.input = '';
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
		$scope.output = '';
	});
})

.controller('earningsCtrl', function($scope) {
	var count = 0;
	var total = 0;
	var tipsArray = [];
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