$(document).ready(function () {

    // Register GSAP ScrollTrigger Plugin
    // gsap.registerPlugin(ScrollTrigger);

    // set GSAP Timeline
    let timeLine = new gsap.timeline({
      scrollTrigger: {
        trigger: "#block",
        pin: false, // pin the trigger element while active
        start: "top center", // when the center of the trigger hits the center of the viewport
        end: "+=200", // end after scrolling 500px beyond the start
        scrub: true,
        markers: true,
        id: "block1",
      },
    });
    timeLine
      .to("#block", 2, { backgroundColor: "red" })
      .to("#block", 1, {
        x: $(window).width() - $("#block").width(),
      }, 0)
      .to("#block", 1, { x: 0 })
     
})
