angular.module("sportsStoreAdmin")
.constant('authUrl', "http://localhost:5500/users/login")
.constant('orderUrl', "http://localhost:5500/orders")
.controller("authCtrl", function($scope, $http, $location, authUrl) {
	
	$scope.authenticate = function(user, password) {
		$http.post(authUrl, {
			username: user,
			password: password
		}, {
			withCredentials: true
		})
		.success(function(data){
			$location.path("/main");
		})
		.error(function(error) {
			$scope.authenticationError = error;
		})
	}
})
.controller("displayCtrl", function($scope, $http, orderUrl) {
	$scope.displayTypes = ["products", "orders"];
	$scope.currentType = "products";

	$scope.selectType = function(type) {
		$scope.currentType = type;
	}

	$scope.getPage = function() {

		return $scope.currentType == "products"? "views/adminProducts.html" : "views/adminOrders.html";
	}

	$http.get(orderUrl, {withCredentials: true})
	.success(function(data) {
		$scope.orderList = data;
	})
	.error(function(error) {
		$scope.orderError = error;
	})

	$scope.getOrderTotalValue = function(order) {
		var total = 0;
		for(var i = 0; i < order.products.length;i++) {
			total += order.products[i].price * order.products[i].count;
		}

		return total;
	}

	$scope.selectedOrder = null;

	$scope.selectOrder = function(order) {
		$scope.selectedOrder = order;
	}
})