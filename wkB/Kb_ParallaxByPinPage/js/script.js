$(function () {
  gsap.registerPlugin(ScrollTrigger);
  const $pinnedContainer = $(".pinned-slides-container");
  const $slide1 = $(".slide-1");
  const $slide2 = $(".slide-2");

  const pinnedTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: $pinnedContainer,
      start: "top top",
      end: "+=200%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  pinnedTimeline
    // A: slide1 文字淡入
    .from(
      $slide1.find(".parallax-content"),
      {
        opacity: 0,
        y: 30,
        duration: 0.2,
        ease: "power2.out",
      },
      0
    )

    // B: slide2 整張從下方滑入
    .from(
      $slide2,
      {
        y: "100%",
        duration: 0.2,
        ease: "none",
      },
      0.45
    )

    // C: slide2 文字淡入
    .from(
      $slide2.find(".parallax-content"),
      {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.out",
      },
      0.7
    );

})