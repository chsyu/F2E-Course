$(document).ready(function () {

    // init ScrollMagic controller
    let controller = new ScrollMagic.Controller();

    // set Timeline
    let timeLine = new TimelineMax()
                .to('#block',1, {backgroundColor: 'red'});

    // build ScrollMagic scene
    new ScrollMagic.Scene({ 
            triggerHook: 'onCenter',
            triggerElement: '#block',
            duration: 200,
        })
        .setTween(timeLine)
        .addIndicators()
        .addTo(controller);
     
})
