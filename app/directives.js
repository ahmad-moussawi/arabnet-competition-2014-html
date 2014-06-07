app.directive('sc', function() {

    return {
        link: function(scope, elm, attrs) {
            SC.oEmbed(attrs.trackUrl, {auto_play: true, maxheight: 200}, function(oEmbed) {
                elm.html(oEmbed.html);
            });
        }
    }

});


app.directive('upload', ['$http', function($http) {
        return {
            require: 'ngModel',
            restrict: 'E',
            link: function(scope, elm, attrs, ctrl) {
                var instance = new Dropzone(elm[0], {
                    url: 'uploader/image',
                    maxFilesize: 1,
                    paramName: 'image',
                    addRemoveLinks: true,
                    maxFiles: 1
                });

                instance.on('success', function(file, response) {
                    ctrl.$setViewValue(response.path);
                    console.log(response);
                    scope.$apply();
                });

                instance.on('removedfile', function(file) {
                    if (ctrl.$viewValue && typeof ctrl.$viewValue.path === 'string') {
                        $http.post('api/uploader/remove', {file: ctrl.$viewValue});
                    }
                });
            }
        };
    }]);

