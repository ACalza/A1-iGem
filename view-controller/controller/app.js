//Half assing it

angular.module('app', [])
.controller('bodyCtrl', ['$scope', '$http', function($scope, $http){
	$scope.currentSeq = null;
	$scope.seqs = [];
	$scope.genAA = function() {
	    var envelopeContents = {
	        dna: $scope.dna
	    };

	    var sentEnvelope = $http.post('http://localhost:3000/genAA', envelopeContents);

	    // could handle this like we did with .success in getSeqs, but for
	    // the sake of variety/learning we will use the promise method then
	    // see https://docs.angularjs.org/api/ng/service/$q
	    // promise.then(success,error,update);
		
	    sentEnvelope.then(function(reply) {
	        // person got our envelope, did some stuff, sent us back a reply
			$scope.currentSeq = reply.data.output;
	    }, function(reason) {
	        alert('Failed: ' + reason);
	    }, function(update) {
	        alert('Got notification: ' + update);
	    });
	};
	$scope.getAll = function() {
	    $http.get("http://localhost:3000/dnas").success(function(data) {
	        $scope.seqs = data;
	    })

	};
}]);

	