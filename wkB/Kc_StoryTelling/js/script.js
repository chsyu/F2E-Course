$(document).ready(function () {

  gsap.registerPlugin(ScrollTrigger);

  const $storySection = $(".story-section");
  const $copyElements = $storySection.find(".story-copy").children();
  const $leftCard = $("#left-card");
  const $rightCard = $("#right-card");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: $storySection,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    })
    .from(
      $copyElements,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      },
      0.1
    )
    .from(
      $leftCard,
      {
        opacity: 0,
        xPercent: -30,
        rotateY: -6,
        duration: 1,
        ease: "expo.out",
        stagger: 0.2,
      },
      0.3
    )
    .from(
      $rightCard,
      {
        opacity: 0,
        xPercent: 30,
        rotateY: 6,
        duration: 1,
        ease: "expo.out",
        stagger: 0.2,
      },
      0.45
    );

}); //jQuery
  