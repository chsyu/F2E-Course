const top_pattern = document.querySelector(".top");
const home_background = document.querySelector(".home_li_0");
const right = document.querySelector(".right");
const menu = document.querySelector(".menu");
const left_pattern = document.querySelector(".left_pattern1");


const tl = new TimelineMax();

tl.fromTo(top_pattern,1,{ x:"-100%" },{x:"0%",ease:Power2.easeInOut},"+=1.5" )
.fromTo(right,1,{ x: "20%" },{x: "0%",ease:Power2.easeInOut },"-=1")
.fromTo(menu,1,{ x: "200%" },{x: "0%",ease:Power2.easeInOut },"-=1")

;




//換圖片
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls


// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("home_li");
    var dots = document.getElementsByClassName("right_textli");
    var line = document.getElementsByClassName("right_textli_lines");
    var patt = document.getElementsByClassName("left_patternn");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        patt[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
        line[i].style.display = 'none';
    }
    slides[slideIndex-1].style.display = 'block';
    patt[slideIndex-1].style.display = 'block';
    line[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].className += " active";
  
}
 


 //.fromTo(left_pattern,1,{ x: "-40%" },{x: "0%",ease:Power2.easeInOut })
 //.fromTo(home_background,2,{ top:"50%", height: "0%",width:"100%" },{top:"0%",height: "1100px",width:"100%" ,ease:Power2.easeInOut} )