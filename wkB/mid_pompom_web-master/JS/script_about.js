const l_t = document.querySelector(".left_top");
const l_m = document.querySelector(".left_middle");
const l_b = document.querySelector(".left_bottom");
const m_t = document.querySelector(".middle_top");
const m_m = document.querySelector(".middle_middle");
const m_b = document.querySelector(".middle_bottom");
const r_t = document.querySelector(".right_top");
const r_m = document.querySelector(".right_middle");
const r_b= document.querySelector(".right_bottom");



const t3 = new TimelineMax();

t3.fromTo(m_t,1,{ y:"-200%" },{y:"0%",ease:Power2.easeInOut})
.fromTo(m_m,1,{ y:"-150%" },{y:"0%",ease:Power2.easeInOut},"-=1")
.fromTo(m_b,1,{ y:"150%" },{y:"0%",ease:Power2.easeInOut},"-=1")
.fromTo(l_t,1,{ x:"-200%" },{x:"0%",ease:Power2.easeInOut})
.fromTo(l_m,1,{ x: "-200%" },{x: "0%",ease:Power2.easeInOut },"-=1")
.fromTo(r_b,1,{ x: "200%" },{x: "0%",ease:Power2.easeInOut },"-=1")


;