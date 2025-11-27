$(document).ready(function () {
  // Register GSAP ScrollTrigger Plugin
  gsap.registerPlugin(ScrollTrigger);

  const parallaxTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".parallax-stage",
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  parallaxTimeline
    .to(".layer-back", { y: 80, ease: "none" }, 0)
    .to(".layer-mid", { y: 120, ease: "none" }, 0)
    .to(".layer-front", { y: 160, ease: "none" }, 0);
});
