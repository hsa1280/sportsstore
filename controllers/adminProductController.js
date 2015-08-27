angular.module("sportsStoreAdmin")
.constant("productsUrl", "http://localhost:5500/products/")
.config(function($httpProvider) {
	$httpProvider.defaults.withCredentials = true;
})
.controller("productCtrl", function($scope, $resource, productsUrl) {

	$scope.productsResource = $resource(productsUrl + ":id", { id: "@id" });

	$scope.listProducts = function() {
		$scope.products = $scope.productsResource.query();
	}

	$scope.deleteProduct = function (product) {
		product.$delete().then(function () {
			$scope.products.splice($scope.products.indexOf(product), 1);
		});
	}

	$scope.createProduct = function(product) {
		new $scope.productsResource(product).$save().then(function(newProduct) {
			$scope.products.push(newProduct);
			$scope.editedProduct = null;
		})

	}

	$scope.updateProduct = function(product) {
		product.$save();
		$scope.editedProduct = null;
	}

	$scope.startEdit = function(product) {
		$scope.editedProduct = product;
	}

	$scope.cancelEdit = function() {
		$scope.editedProduct = null;
	}

	$scope.listProducts();
})
.directive("ngConfirmClick", function() {
	return {
		link: function(scope, element, attr) {
			var msg = attr.onConfirmClick;
			var clickAction = attr.confirmedClick;
			element.on("click", function() {
				if(confirm(msg)) {
					scope.$apply(clickAction);
					//can use either $eval or $apply
				}
			})
		}
	}
})