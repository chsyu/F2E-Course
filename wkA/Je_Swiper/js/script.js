const swiper = new Swiper('.swiper-container', {
   slidesPerView: 1,
   spaceBetween: 10,
   loop: true,
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
   pagination: {
     el: '.swiper-pagination',
     clickable: false,
   },
   breakpoints: {
     576: {
       slidesPerView: 2,
       spaceBetween: 10,
     },
     768: { 
       slidesPerView: 3,
       spaceBetween: 10,
     },
     992: {
       slidesPerView: 4,
       spaceBetween: 10,
     },
   },
 });
