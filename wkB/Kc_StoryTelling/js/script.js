gsap.registerPlugin(ScrollTrigger);

const storySection = document.querySelector(".story-section");
const copyElements = storySection.querySelectorAll(".story-copy > *");
const leftCard = document.querySelector("#left-card");
const rightCard = document.querySelector("#right-card");

gsap
  .timeline({
    scrollTrigger: {
      trigger: storySection,
      start: "top top",
      end: "+=150%",
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  })
  .from(
    copyElements,
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
    leftCard,
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
    rightCard,
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
