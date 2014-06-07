app.factory('Twitter', function($http, $q) {
    var service = {};
    var api_url = 'api/twitter';

    service.getRaw = function(url, params, fresh) {
        var fresh = fresh || 0;

        return $http({
            url: api_url,
            method: 'GET',
            params: {
                url: url,
                fresh: fresh,
                params: params
            }
        });
    };

    service.getUser = function(user_id, screen_name, include_entities) {
        var params = {};

        if (user_id) {
            params.user_id = user_id;
        }

        if (screen_name) {
            params.screen_name = screen_name;
        }

        params.include_entities = include_entities || false;


        return service.getRaw('users/show.json', params);
    };

    service.getUserByScreenName = function(screen_name, include_entities) {
        return service.getUser(null, screen_name, include_entities);
    };

    service.getUserById = function(id, include_entities) {
        return service.getUser(id, null, include_entities);
    };

    service.searchUsers = function(q, page, perpage, include_entities) {
        var params = {
            q: q,
            page: page || 1,
            perpage: perpage || 5,
            include_entitites: include_entities || 0
        };

        return service.getRaw('users/search.json', params);
    };



    return service;
});