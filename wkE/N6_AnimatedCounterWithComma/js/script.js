gsap.to("#counter", {
  textContent: 123456,
  duration: 1,
  ease: "power1",
  snap: { textContent: 1 },
  stagger: {
    each: 1.0,
    onUpdate: function () {
      this.targets()[0].innerHTML = numberWithCommas(
        this.targets()[0].textContent
      );
    },
  },
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
