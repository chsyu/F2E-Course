$(document).ready(function () {


gsap.utils.toArray("section").forEach((section, i) => {
  section.bg = section.querySelector(".bg"); 

  // Do the parallax effect on each section
  if (i) {
    gsap.to(section.bg, {
      backgroundPosition: `50% 250px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        scrub: true,
        // markers: true,
        id: i,
      },
    });
  } 
  
  // the first image should be positioned against the top. Use px on the animating part to work with GSAP. 
  else {
    gsap.to(section.bg, {
      backgroundPosition: `50% 250px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "bottom top",
        scrub: true,
        // markers: true,
        // id: i,
      }
    });
  }
}); 
});
