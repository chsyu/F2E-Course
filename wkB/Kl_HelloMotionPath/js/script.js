$(document).ready(function() {
  gsap.to(".arrow", {
    duration: 2, 
    ease: "none",
    motionPath: {
      path: ".path",
      align: ".path",
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
      // start: 0.5,
      // end: 0.9,
    }
  })
  
  // gsap.set(".arrow", {opacity: 0.5})
  // GSDevTools.create({animation:animation})
})


