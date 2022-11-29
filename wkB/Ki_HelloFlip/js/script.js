$(document).ready(function() {
  let click = true;
  gsap.registerPlugin(Flip);

  const container1 = $(".container1");
  const container2 = $(".container2");
  const box1 = $(".box1");
  const box2 = $(".box2");

  $(document).click(function(e) {
    const state = Flip.getState(".box1, .box2");
    if(click) {
      container1.append(box2);
      container2.append(box1);      
    } else {
      container1.append(box1);
      container2.append(box2);            
    }
    click = !click;
    Flip.from(state, {
      duration: 1,
      ease: "power1.out",
      absolute: true
    });
  })
})


