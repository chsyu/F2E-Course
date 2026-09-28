const images = document.querySelectorAll('img');
const loadedCount = document.querySelector('#loaded-count');
const totalCount = document.querySelector('#total-count');
let count = 0;

totalCount.textContent = images.length;

const onLoaded = (img) => {
  count++;
  loadedCount.textContent = count;
  img.classList.add('loaded');
  console.log(`[${count}/${images.length}] loading="${img.loading}" 已載入：${img.alt}`);
};

images.forEach((img) => {
  if (img.complete && img.naturalWidth > 0) {
    onLoaded(img);
  } else {
    img.addEventListener('load', () => onLoaded(img), { once: true });
  }
});
