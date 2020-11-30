$(document).ready(function () {

  // Load JSON file
  let openingAnimWindow = document.querySelector('#openingLottie');
  let openingAnimData = {
    container: openingAnimWindow,
    animType: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    // path: 'json/download-icon.json'
    path: 'https://assets.lottiefiles.com/datafiles/jORpumH9Yn0XoXQ/data.json'
  };
  // set bodymovin
  let openingAnim = bodymovin.loadAnimation(openingAnimData);


  $('#lottie-start').click(function () {
    openingAnim.play();
  });

  $('#lottie-pause').click(function () {
    openingAnim.pause();
  });

  $('#lottie-stop').click(function () {
    openingAnim.stop();
  });

});
