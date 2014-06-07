var cache = {};
cache.playlists = [];

function serial(data) {
    return Object.keys(data).map(function(key) {
        var row = data[key];
        row.unshift(key);
        return row;
    });
}


function Round1Ctrl($scope, $http) {
    $scope.removeImage = function(url) {
        if (!url)
            return;
        $http.post('api/uploader/remove', {file: url});
        url = null;
    };


    $scope.products = [
        {
            id: 1,
            title: "Red Heels",
            category: "Shoes",
            price: "80"
        },
        {
            title: "The Republic",
            category: "Book",
            price: "25"
        },
        {
            id: 2,
            title: "The Screwtape Letters",
            category: "Book",
            price: "68"
        },
        {
            id: 3,
            title: "Archie Comic Vol. 345",
            category: "Book",
            price: "3"
        },
        {
            id: 4,
            title: "Levi’s Jeans",
            category: "Clothes",
            price: "60"
        },
        {
            id: 5,
            title: "Nexus Tablet",
            category: "Electronics",
            price: "230"
        },
        {
            id: 6,
            title: "Black Dockers",
            category: "Shoes",
            price: "40"
        },
        {
            id: 7,
            title: "MakerBot",
            category: "Electronics",
            price: "800"
        }];


    $scope.cart = [];

    $scope.add = function(item) {

        //check if exist
        isexist = $scope.cart.filter(function(r) {
            return r.id == item.id;
        });

        if (isexist.length) {
            $scope.cart.forEach(function(r) {
                if (r.id == item.id) {
                    if (r.qty < 5) {
                        r.qty++;
                    } else {
                        alert('You can\'t put more than five items :(')
                    }
                }
            });
        } else {
            item.qty = 1;
            $scope.cart.push(item);
        }
    };

    $scope.incart = function(item) {
        var found = $scope.cart.filter(function(r) {
            return r.id == item.id;
        });

        return found.length > 0;
    };

    $scope.remove = function(item) {

        if (!confirm('Are you sure you want to remove this item ?')) {
            return false;
        }

        var old = $scope.cart;
        $scope.cart = old.filter(function(r) {
            return r.id != item.id
        });

    };

    $scope.total = function() {
        var total = 0;
        $scope.cart.forEach(function(r) {
            total += (r.qty * r.price);
        });

        return total;
    };

    $scope.total2 = function() {
        var total = $scope.total();

        if ($scope.getBooks() > 1) {
            total = total * .8;
        }

        if ($scope.getElectronics() > 0 && $scope.getClothing() > 0) {
            total = total * .9;
        }

        if (total <= 70) {
            total += 10;
        }

        return total;

    };

    $scope.getqty = function(item) {

        var p = $scope.cart.filter(function(r) {
            return r.id == item.id;
        });

        console.log(p);

        if (p.length > 0) {
            return p[0].qty;
        }

        return 0;

    };

    $scope.getBooks = function() {

        var qty = 0;
        var items = $scope.cart.filter(function(r) {
            if (r.category === "Book") {
                qty += r.qty;
            }
        });

        return qty;
    };

    $scope.getElectronics = function() {

        var qty = 0;
        var items = $scope.cart.filter(function(r) {
            if (r.category === "Electronics") {
                qty += r.qty;
            }
        });

        return qty;
    };

    $scope.getClothing = function() {

        var qty = 0;
        var items = $scope.cart.filter(function(r) {
            if (r.category === "Clothes") {
                qty += r.qty;
            }
        });

        return qty;
    };



}

function Round2Ctrl($scope, $http, $timeout) {
    $scope.show = false;
    $scope.searching = false;

    $timeout(function() {
        $scope.show = true;
        $scope.term = 'Truth of touch'; // default val
    }, 300);

    $scope.formStyle = {};
    
    

    $scope.search = function(term) {

        if (!term) {
            alert('Please enter an artist or a song title!');
            return;
        }

        $scope.searching = true;

        $scope.playlists = [];

        SC.get('/playlists?limit=1', {q: term}, function(playlists) {
            console.log(playlists);
            $scope.playlists = playlists.slice(0, 3);
            cache.playlists = playlists;

            if (playlists[0].tracks.length === 0) {
                alert('Oops no results found please search again !');
                return;
            }

            $scope.formStyle = {position: 'relative', top: '-80px'}
            $scope.$apply();

        });


        $http.get('https://api.500px.com/v1/photos/search?tag=' + term + '%20music&image_size=4&consumer_key=' + API['500px'].consumer_key).success(function(data) {
            console.log(data);
            var photos = data.photos.map(function(r) {
                return r.image_url;
                return {
                    image: r.image_url,
                    thumb: r.images[0].url,
                    title: r.description
                };
            });
            
            // in case we didn't find images
            photos.push('http://wallpapertoon.com/wp-content/uploads/2014/01/I-love-music-desktop-wallpaper.jpg');
            photos.push('http://wallpapertoon.com/wp-content/uploads/2014/03/grunge-abstract-backgrounds.jpg');
            photos.push('http://4put.ru/pictures/max/790/2428740.gif');
            photos.push('http://media3.giphy.com/media/h6fsZE35xIgVy/giphy.gif');
            photos.push('http://www.likecool.com/Gear/Pic/Gif%20Music%20play/Gif-Music-play.gif');
            photos.push('http://audio-narkotuku.ucoz.ru/_ph/16/2/414268354.gif');





//            $("#supersized").remove();

            $scope.searching = false;

            $.backstretch(photos, {
                fade: 750, //Speed of Fade
                duration: 3500     // The length of Time the image is display
            });

//            $.supersized({
//                // Functionality
//                slideshow: 1, // Slideshow on/off
//                autoplay: 1, // Slideshow starts playing automatically
//                start_slide: 1, // Start slide (0 is random)
//                stop_loop: 0, // Pauses slideshow on last slide
//                random: 0, // Randomize slide order (Ignores start slide)
//                slide_interval: 1000, // Length between transitions
//                transition: 6, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
//                transition_speed: 1000, // Speed of transition
//                new_window: 1, // Image links open in new window/tab
//                pause_hover: 0, // Pause slideshow on hover
//                keyboard_nav: 1, // Keyboard navigation on/off
//                performance: 1, // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
//                image_protect: 1, // Disables image dragging and right click with Javascript
//
//                // Size & Position						   
//                min_width: 0, // Min width allowed (in pixels)
//                min_height: 0, // Min height allowed (in pixels)
//                vertical_center: 1, // Vertically center background
//                horizontal_center: 1, // Horizontally center background
//                fit_always: 0, // Image will never exceed browser width or height (Ignores min. dimensions)
//                fit_portrait: 1, // Portrait images will not exceed browser height
//                fit_landscape: 0, // Landscape images will not exceed browser width
//
//                // Components							
//                slide_links: 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
//                thumb_links: 1, // Individual thumb links for each slide
//                thumbnail_navigation: 0, // Thumbnail navigation
////                slides: [// Slideshow Images
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title: 'Image Credit: Maria Kazvan', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url: 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg', title: 'Image Credit: Maria Kazvan', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-2.jpg', url: 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg', title: 'Image Credit: Maria Kazvan', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-3.jpg', url: 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg', title: 'Image Credit: Colin Wojno', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-1.jpg', url: 'http://www.nonsensesociety.com/2011/03/colin/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg', title: 'Image Credit: Colin Wojno', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-2.jpg', url: 'http://www.nonsensesociety.com/2011/03/colin/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg', title: 'Image Credit: Colin Wojno', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/wojno-3.jpg', url: 'http://www.nonsensesociety.com/2011/03/colin/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg', title: 'Image Credit: Brooke Shaden', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-1.jpg', url: 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg', title: 'Image Credit: Brooke Shaden', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-2.jpg', url: 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'},
////                    {image: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg', title: 'Image Credit: Brooke Shaden', thumb: 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/shaden-3.jpg', url: 'http://www.nonsensesociety.com/2011/06/brooke-shaden/'}
////                ],
////                
//                slides: photos,
//                // Theme Options			   
//                progress_bar: 1, // Timer for each slide							
//                mouse_scrub: 0
//            });
        });
    };

}

function Round3Ctrl($scope, $http) {

    $scope.crates = [];



    $scope.calculate = function() {
        var boxes = $scope.boxes.split(',').map(function(r) {
            return Number(r)
        });
        console.log(boxes);
        var crates = $scope.distribute(boxes);
        $scope.crates = crates;
    };





    $scope.distribute = function(boxes) {

        boxes.sort(function(a, b) {
            return b - a;
        });

        console.log(boxes);

        var crates = [];

        var total = 0;

        var bt = 0;
        boxes.forEach(function(b) {
            bt += b;
        });

        while (boxes.length) {
            boxes.sort(function(a, b) {
                return b - a;
            });

            var c = new Crate();

            for (var i = 0; i < boxes.length; i++) {
                var b = boxes[i];

                if (c.canAdd(b)) {
                    c.push(b);
                    total += b;
                    boxes.splice(i, 1);
                }

                console.log(b, c.complement(b), boxes.indexOf(c.complement(b)));

                if (boxes.indexOf(c.complement(b)) > -1) {
                    c.push(boxes[boxes.indexOf(c.complement(b))]);
                    total += boxes[boxes.indexOf(c.complement(b))];
                    boxes.splice(boxes.indexOf(c.complement(b)), 1);
                    break;
                }
                if (i === (boxes.length - 1)) {
                    crates.push(c);
                    break;
                }
            }
            crates.push(c);
            console.log(total, bt);
            if (total === bt) {
                break;
            }
        }


        return crates.splice(0, bt / 25);
    };
}

function TwitterCtrl($scope, Twitter) {

    $scope.getFollowers = function() {
        var params = [{
                screen_name: 'ahmadmuzavi'
            }];

        Twitter.getRaw('followers/ids.json', params).success(function(data) {
            $scope.followers = data;
        });
    };

    $scope.getUser = function(screen_name) {
        Twitter.getUserByScreenName(screen_name).success(function(user) {
            $scope.user = user;
        });
    };

    $scope.searchUsers = function(q) {
        Twitter.searchUsers(q).success(function(results) {
            $scope.results = results;
        });
    };
}

function SoundCloudCtrl($scope) {

    if (!cache.playlists.length) {
        SC.get('/playlists', {q: 'yanni'}, function(playlists) {
            $scope.playlists = playlists.slice(0, 3);
            cache.playlists = playlists;
            $scope.$apply();
        });
    } else {
        $scope.playlists = cache.playslists;
    }


    $scope.getLatest = function() {
        SC.get("/groups/55517/tracks", {limit: 1}, function(tracks) {

            $scope.$apply(function() {
                $scope.tracks = tracks;
            });
        });
    };

    $scope.login = function() {
        // initiate auth popup
        SC.connect(function() {
            SC.get('/me', function(me) {

                $scope.me = me;
                $scope.$apply();
            });
        });
    };

    $scope.stream = function() {
        // stream track id 293
        SC.stream("/tracks/293", function(sound) {
            sound.play();
        });
    };

}

function DeezerCtrl() {

}


function ChartsCtrl($scope, $http) {
    var chart = c3.generate({
        bindto: '#chart1',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    });
}


/**
 * @class Calculator
 */
function Calculator(price, wrapper_count) {

    this.price = price;
    this.wrapper_count = wrapper_count;

    function getByDollar(dollars) {
        return dollars / this.price;
    }

    function getByWrapper(wrappers) {
        return wrappers / this.wrapper_count;
    }

    /** @method **/
    function calculate(money) {
        var qty = 0;
        var tmp = this.getByDollar(money);
        qty += tmp;
        while (this.getByWrapper(tmp) >= 1) {
            tmp = this.getByWrapper(tmp);
            qty += tmp;
        }
        return qty;
    }
}



























function getChocolatesByDollar(money) {
    return money / 1;
}

function getNumbers(money) {
    var price = 3;

    var qty = 0;
    var wrappers = 0;

    while (money > 0) {
        qty++;
        wrappers++;
        money -= price;

        if (wrappers === 3) {
            qty++;
            wrappers = 0;
        }
    }

    console.log(wrappers);

    return qty;
}


function Crate() {

    var size = 25;
    var stack = [];

    this.toString = function() {
        return stack.join(',');
    };

    this.weight = function() {

        if (!stack.length) {
            return 0;
        }

        return stack.reduce(function(a, b) {
            return a + b;
        });
    };

    /**
     * 
     * @param int item
     * @return the total weight of the crate
     */
    this.push = function(item) {
        if (this.canPush(item)) {
            stack.push(item);
        }
        return this.weight();
    };

    this.canPush = function(item) {
        return (this.weight() + item) <= size;
    };

    this.free = function() {
        return size - this.weight();
    };
}

function sortDesc(a, b) {
    return b - a;
}

function distribute(boxes) {
    boxes.sort(sortDesc);

    var total = boxes.reduce(function(a, b) {
        return a + b
    });
    console.debug('Total boxes %s', total);

    var cratesNeeded = total / 25;
    console.debug('Crates needed %s', cratesNeeded);

    var crate = new Crate();

    var i = 0;
    while (boxes.length && i < boxes.length) {
        if (crate.push(boxes[i])) {
            boxes.slice(i, 1);
        }
        i++;
    }


    console.log(crate.toString());



}

