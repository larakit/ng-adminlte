(function () {

    angular
        .module('larakit')
        .factory('LkngGen', Factory);

    Factory.$inject = ['$http', '$q'];

    function Factory($http, $q) {
        var self = this;
        self.tables = null;

        return {
            tables: tables
        };

        function tables() {
            var deferred = $q.defer();
            if (null === self.tables) {
                $http
                    .get('/!/lknggen/tables')
                    .then(function (response) {
                        self.tables = response.data;
                        deferred.resolve(self.tables);
                        return deferred.promise;
                    });
            } else {
                deferred.resolve(self.tables);
            }
            return deferred.promise;
        }
    }

})();