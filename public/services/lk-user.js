(function () {

    angular
        .module('larakit')
        .factory('LkUser', Factory);

    Factory.$inject = ['$http', '$q'];

    function Factory($http, $q) {
        var self = this;
        self.user = {};
        return {
            me: getAuthUser
        };

        function getAuthUser() {
            var deferred = $q.defer();
            if ('undefined' === typeof (self.user.id)) {
                $http
                    .get('/!/ajax/me')
                    .then(function (response) {
                        self.user = response.data;
                        deferred.resolve(self.user);
                        return deferred.promise;
                    }, function () {
                        self.user = {};
                        deferred.resolve(self.user);
                        return deferred.promise;
                    });
            } else {
                deferred.resolve(self.user);
            }
            return deferred.promise;
        }

    }

})();