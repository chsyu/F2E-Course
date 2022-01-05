gsap.to("#counter", {
  innerText: 123456,
  duration: 1,
  ease: "power1",
  increment: 1,
  snap: {
    innerText: 1,
  },
});
