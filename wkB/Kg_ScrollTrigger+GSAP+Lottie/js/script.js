$(document).ready(function () {
  // Load JSON file
  let openingAnimWindow = document.querySelector("#openingLottie");
  let openingAnimData = {
    container: openingAnimWindow,
    animType: "svg",
    loop: false,
    prerender: true,
    autoplay: false,
    path: "json/download-icon.json",
    // path: 'https://assets.lottiefiles.com/datafiles/jORpumH9Yn0XoXQ/data.json'
  };
  // set bodymovin
  let scrollAnim = bodymovin.loadAnimation(openingAnimData);

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
  scrollAnim.addEventListener("DOMLoaded", onDOMLoaded);

  // // Frame-by-frame play
  function onDOMLoaded() {
    timeLine_page2.to(
      {
        frame: 0,
      },
      3,
      {
        frame: scrollAnim.totalFrames - 1,
        onUpdate: function () {
          scrollAnim.goToAndStop(Math.round(this.targets()[0].frame), true);
          $("#counter").html(Math.round(this.targets()[0].frame));
        },
        ease: Linear.easeNone,
      }
    );
  }
})
