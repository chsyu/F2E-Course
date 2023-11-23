$(document).ready(function () {

    // Register GSAP ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger);

    // set scrollTrigger option
    const scrollTriggerOption = {
      scrollTrigger: {
        trigger: "#page2",
        pin: true, // pin the trigger element while active
        start: "center center", // when the center of the trigger hits the center of the viewport
        end: "+=200", // end after scrolling 200px beyond the start
        scrub: true,
        markers: true,
        id: "page2",
      },
    };

    // set GSAP Timeline
    const timeLine = gsap.timeline(scrollTriggerOption);
    timeLine
      .to("#block", 2, { backgroundColor: "red" })
      .to("#block", 1, {
        x: $(window).width() - $("#block").width(),
      }, 0) // 0 is used to let the animation start at the same time as the previous animation
      .to("#block", 1, { x: 0 })
     
})
