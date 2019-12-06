$(document).ready(function () {

  // set Timeline Counter
  let timeLine = new TimelineMax()
    .to({
      frame: 0
      }, 3, {
      frame: 1000 - 1,
      onUpdate: function () {
        $('#counter').html(Math.round(this.target.frame));
      },
      ease: Linear.easeNone
    });


  // init ScrollMagic controller
  let controller = new ScrollMagic.Controller();

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
    duration: '30%'
  })
    .setPin('#page1', { pushFollowers: false })
    .addIndicators()
    .addTo(controller)

})
