var tl = new TimelineMax({onUpdate:updatePercentage});
var tl2 = new TimelineMax({onUpdate:updatePercentage});
var tl3 = new TimelineMax({onUpdate:updatePercentage});
var tl4 = new TimelineMax({onUpdate:updatePercentage});
const controller = new ScrollMagic.Controller();
const controller2 = new ScrollMagic.Controller();
const controller3 = new ScrollMagic.Controller();
const controller4 = new ScrollMagic.Controller();




tl.from('.orange_text', .5, {x:-400, opacity: 0},"=-1.5");
tl.from('.orange_pic', 1, {x:200, opacity: 0}, "=-.5");
tl.from('.orange_wine', 1, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-1");



    tl2.from(".top_left", 1, {opacity: 0});
    tl2.to(".top_left", .5, {opacity: 1})

    tl2.from(".top_right", 2, {opacity: 0});
    tl2.to(".top_right", .5, {opacity: 1})

tl2.from('.blue_text', 1.5, {x:-200, opacity: 0});
tl2.from('.blue_pic', 2, {x:200, opacity: 0}, "=-1.5");
tl2.from('.blue_wine', 2, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-2");

    tl3.from(".middle_left", 1, {opacity: 0});
    tl3.to(".middle_left", .5, {opacity: 1})

    tl3.from(".middle_right", 2, {opacity: 0});
    tl3.to(".middle_right", .5, {opacity: 1})

tl3.from('.red_text', 1.5, {x:-200, opacity: 0});
tl3.from('.red_pic', 2, {x:125, opacity: 0}, "=-1.5");
tl3.from('.red_wine', 2, {opacity: 0,ease: Power4.easeInOut}, "=-2");

    tl4.from(".bottom_left", 1, {opacity: 0});
    tl4.to(".bottom_left", .5, {opacity: 1})

    tl4.from(".bottom_right", 2, {opacity: 0});
    tl4.to(".bottom_right", .5, {opacity: 1})

tl4.from('.green_text', 1.5, {x:150, opacity: 0});
tl4.from('.green_pic', 2, {x:200, opacity: 0}, "=-1.5");
tl4.from('.green_wine', 2, {x:-200, opacity: 0,ease: Power4.easeInOut}, "=-2");





const scene = new ScrollMagic.Scene({
  triggerElement: ".orange",
            triggerHook: "onLeave",
            duration: "70%"
})
  .setPin(".orange")
  .setTween(tl)
  .addIndicators()
  .addTo(controller);

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".blue",
                triggerHook: "onLeave",
                duration: "70%"
})
    .setPin(".blue")
    .setTween(tl2)
    .addIndicators()
            .addTo(controller2);
const scene3 = new ScrollMagic.Scene({
    triggerElement: ".red",
                triggerHook: "onLeave",
                duration: "70%"
})
    .setPin(".red")
    .setTween(tl3)
    .addIndicators()
            .addTo(controller3);
const scene4 = new ScrollMagic.Scene({
    triggerElement: ".green",
                triggerHook: "onLeave",
                duration: "70%"
})
    .setPin(".green")
    .setTween(tl4)
    .addIndicators()
    .addTo(controller4);
            

/////////////

function updatePercentage() {
  //percent.innerHTML = (tl.progress() *100 ).toFixed();
    tl.progress();
    console.log(tl.progress());
    tl2.progress();
    console.log(tl2.progress());
    tl3.progress();
    console.log(tl3.progress());
    tl4.progress();
    console.log(tl4.progress());

}

