$(document).ready(function () {

    // Register GSAP ScrollTrigger Plugin
    // gsap.registerPlugin(ScrollTrigger);

    // set GSAP Timeline
    let timeLine = new gsap.timeline({
      scrollTrigger: {
        trigger: "#block",
        pin: true, // pin the trigger element while active
        start: "center center", // when the top of the trigger hits the top of the viewport
        end: "+=200", // end after scrolling 500px beyond the start
        scrub: true,
        markers: true,
        id: "block",
      },
    });
    timeLine
      .to("#block", 2, { backgroundColor: "red" })
      .to("#block", 1, {
        x: $(window).width() - $("#block").width(),
      }, 0)
      .to("#block", 1, { x: 0 })
     
})
