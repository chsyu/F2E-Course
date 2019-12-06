$(document).ready(function () {

  // Load JSON file
  let openingAnimWindow = document.querySelector('#openingLottie');
  let openingAnimData = {
    container: openingAnimWindow,
    animType: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    path: 'json/download-icon.json'
    // path: 'https://assets.lottiefiles.com/datafiles/jORpumH9Yn0XoXQ/data.json'
  };
  // set bodymovin
  let scrollAnim = bodymovin.loadAnimation(openingAnimData);

  // set Timeline
  let timeLine = new TimelineMax();
  scrollAnim.addEventListener('DOMLoaded', onDOMLoaded);
  
  // Frame-by-frame play
  function onDOMLoaded() {
    timeLine.to({
      frame: 0
    }, 3, {
      frame: scrollAnim.totalFrames - 1,
      onUpdate: function() {
        scrollAnim.goToAndStop(Math.round(this.target.frame), true)
        $('#counter').html(Math.round(this.target.frame));
      },
      ease: Linear.easeNone
    })
  }  

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
