const hamburger = document.querySelector('.menu');
const navlinks = document.querySelector('.page_menu');
const links = document.querySelector('.page_menu li');

const t2 = new TimelineMax();


var currentOpacity = 1;

hamburger.addEventListener("click", () => {


navlinks.classList.toggle("open");
hamburger.classList.toggle("change");

});

$("#pat1").click(function(){
    window.location.href='index_home.html';
 });
 $("#pat2").click(function(){
    window.location.href='index_about.html';
 });
 $("#pat3").click(function(){
   window.location.href='index_drinks.html';
});
$("#pat4").click(function(){
   window.location.href='index_contact.html';
});

$(".footer_li1").click(function(){
   window.location.href='index_home.html';
});
$(".footer_li2").click(function(){
   window.location.href='index_about.html';
});
$(".footer_li3").click(function(){
  window.location.href='index_drinks.html';
});
$(".footer_li4").click(function(){
  window.location.href='index_contact.html';
});