$(document).ready(function () {


  gsap.utils.toArray("section").forEach((section, i) => {
    let bg = section.querySelector(".bg"); 
    // the first image should be positioned against the top. Use px on the animating part to work with GSAP. 
    if(i==0) {
      gsap.to(bg, {
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
    } else {     // Do the parallax effect on each section
      gsap.to(bg, {
        backgroundPosition: `50% 250px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: true,
          // markers: true,
          // id: i,
        },
      });
    } 
  }); 

}); //jQuery
  