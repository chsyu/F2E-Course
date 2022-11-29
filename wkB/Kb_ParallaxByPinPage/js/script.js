$(document).ready(function () {
  // Register GSAP ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set Pin Page
  ScrollTrigger.create({
    trigger: "#page1",
    start: "top top",
    pin: true,
    pinSpacing: false,
    snap: true,
  }); 

  // Set GSAP Timeline with Pin
  let timeLine_page2 = new gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      yoyo: true,
      pin: true, // pin the trigger element while active
      start: "bottom bottom", // when the top of the trigger hits the top of the viewport
      end: "100%", // end after scrolling 500px beyond the start
      scrub: true,
      markers: true,
      id: "page2",
      snap: true,
    },
  });
  timeLine_page2
    .to("#block", 2, { backgroundColor: "red" })
    .to("#block", 1, { x: $(window).width() - $("#block").width() }, 0)
    .to("#block", 1, { x: 0 });

  let timeLine_page3 = new gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      yoyo: true,
      pin: true, // pin the trigger element while active
      start: "bottom bottom", // when the top of the trigger hits the top of the viewport
      end: "100%", // end after scrolling 500px beyond the start
      scrub: true,
      markers: true,
      id: "page3",
    },
  });
  timeLine_page3
    .to("#page3-title", 2, { color: "red", fontSize: 100 })


});
