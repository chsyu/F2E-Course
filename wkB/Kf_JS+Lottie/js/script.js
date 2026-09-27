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


document.querySelector('#lottie-start').addEventListener('click', function () {
  openingAnim.play();
});

document.querySelector('#lottie-pause').addEventListener('click', function () {
  openingAnim.pause();
});

document.querySelector('#lottie-stop').addEventListener('click', function () {
  openingAnim.stop();
});
