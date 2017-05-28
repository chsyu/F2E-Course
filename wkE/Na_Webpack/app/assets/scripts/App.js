var $ = require('jquery');
var setText = function() {
    $(".site-wrapper__text").html('Hello Webpack ...');
};


$(".site-wrapper__button").click(() => setText());