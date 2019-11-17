$(document).ready(function () {

    // init ScrollMagic controller
    let controller = new ScrollMagic.Controller();

    // set Timeline
    let timeLine = new TimelineMax()
                .to('#block',1, {
                    x: $(window).width()-$('#block').width()
                })
                .from('.title',0.5,{opacity: 0}, 0)
                .to('#block',1, {x: 0});

    // build ScrollMagic scene
    new ScrollMagic.Scene({ 
            triggerHook: 'onLeave',
            triggerElement: '#page2',
            duration: '100%'
        })
        .setTween(timeLine)
        .setPin('#page2')
        .addIndicators()
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerHook: 'onLeave',
        triggerElement: '#page1',
        duration: '100%'
    })
    .setPin('#page1', {pushFollowers: false})
    .addIndicators()
    .addTo(controller)
     
})
