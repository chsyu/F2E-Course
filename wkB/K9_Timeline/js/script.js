gsap.set("#box1", {
  backgroundColor: "red",
});

let tl = gsap.timeline();
tl.to("#box1", 1, { x: 450 })
  .to("#box1", 1, { x: 0 })
  .to("#box1", 1, { x: 225, y: 225 })
  .to("#box1", 3, { rotation: 360 });

// gsap.to('#box1', 1,
//         {
//             x: 450, y:450,
//             delay: 0.2,
//             ease: Elastic.easeOut.config(1, 0.3)
//         })
