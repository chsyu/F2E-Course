$(document).ready(function () {
  // Register GSAP ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set Pin Page
  ScrollTrigger.create({
    trigger: "#page1",
    start: "top top",
    pin: true,
    pinSpacing: false,
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
    },
  });
  timeLine_page2.to({ frame: 0 }, 3, {
    frame: 1000 - 1,
    onUpdate: function () {
      $("#counter").html(Math.round(this.targets()[0].frame));
    },
    ease: Linear.easeNone,
  });

})
