var app = angular.module('arabnet-competition', ['ngRoute', 'ngAnimate']);

var API = {
    twitter: {
        key: 'ByepCYBxvsKxl3hzQ59AD5ymq',
        secret: 'fKbuOZmL1jwuY1se30FRidOga8esE6qN8s1CSV4vt7K6cloqey'
    },
    soundcloud: {
        client_id: '83c989417e9584185c116a9b15fb18b3',
        client_secret: '63e5c64fa6fe769b337191f1a100ae39'
    },
    deezer: '016e9124c0e7a69e1d6a051d0bdfed7f',
    youtube: '',
    facebook: '',
    '500px': {
        consumer_key: 'TGQIxvmdOgMBdC0NrN7iMnxDfnboJyMUZ9004Rv1',
        consumer_secret: 'INeJnqiQO1COUsS94kiPce2PNCmxXAh05iRXp4qr',
        js_key: '2f6719d09579a0cbffd82fce3045a84eed9bfa6d'
    },
    flickr: '',
};

app.config(function($routeProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://soundcloud.com/**',
        'http://soundcloud.com/**',
        'http://www.youtube.com',
    ]);

    // The blacklist overrides the whitelist so the open redirect here is blocked.
    $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**']);

    $routeProvider.when('/', {
        templateUrl: 'partials/main.html',
        controller: function() {
            console.log('index')
        }
    }).when('/round1', {
        templateUrl: 'partials/round1.html',
        controller: Round1Ctrl
    }).when('/round2', {
        templateUrl: 'partials/round2.html',
        controller: Round2Ctrl
    }).when('/round3', {
        templateUrl: 'partials/round3.html',
        controller: Round3Ctrl
    }).when('/twitter', {
        templateUrl: 'partials/twitter.html',
        controller: TwitterCtrl
    }).when('/soundcloud', {
        templateUrl: 'partials/soundcloud.html',
        controller: SoundCloudCtrl
    }).when('/deezer', {
        templateUrl: 'partials/deezer.html',
        controller: DeezerCtrl
    }).when('/charts', {
        templateUrl: 'partials/charts.html',
        controller: ChartsCtrl
    });

});

