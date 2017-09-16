(function () {

	angular.module('qudini.QueueApp')
		.directive('customer', Customer);

	Customer.$inject = ['$http'];

	/**
	* The <customer> directive is responsible for:
	* - serving customer
	* - calculating queued time
	* - removing customer from the queue
	*/
	function Customer($http) {
		return {
			restrict: 'E',
			scope: {
				customer: '=',
				onRemoved: '&',
				onServed: '&'
			},
			replace: true,
			templateUrl: '/customer/customer.html',
			link: function (scope) {

				// calculate how long the customer has queued for
				scope.queuedTime = new Date() - new Date(scope.customer.joinedTime);

				scope.serveCustomer = function (customerId) {
					$http.put('/api/customer/serve', { id: customerId })
						.then(scope.onServed);
				}

				scope.remove = function () {
					var params = { id: scope.customer.id };

					$http.delete('/api/customer/remove', { params: params })
						.then(function () {
							scope.onRemoved();
						});
				};

			}
		};
	}

})();
