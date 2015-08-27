angular.module("sportsStore")
.controller("checkoutCtrl", function($scope, cart) {
	$scope.cartData = cart.getProducts();

	$scope.getSubtotal = function(product) {
		var total = 0;
		total += product.price * product.count;
		return total;
	}

	$scope.getTotal = function() {
		var total = 0;
		for( var i = 0; i < $scope.cartData.length; i++) {
			total += $scope.cartData[i].price * $scope.cartData[i].count;
		}

		return total;
	}

	$scope.removeProduct = function(product) {
		cart.removeProduct(product.id);
	}
})