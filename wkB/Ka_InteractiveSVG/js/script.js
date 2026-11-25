const map = document.querySelector('#island-map');
const hoverName = document.querySelector('#hover-name');
const selectedName = document.querySelector('#selected-name');

const regionFromEvent = (event) => event.target.closest('.region');

// 為什麼委派在 svg：區域之後增減 path 不用重綁；也統一處理 click / keyboard
map.addEventListener('pointerover', (event) => {
  const region = regionFromEvent(event);
  if (!region || !map.contains(region)) {
    return;
  }
  hoverName.textContent = region.dataset.name ?? '—';
});

map.addEventListener('pointerout', (event) => {
  const region = regionFromEvent(event);
  if (!region) {
    return;
  }
  // 只有真的離開該 path（不是移到子節點）才清空
  if (event.relatedTarget && region.contains(event.relatedTarget)) {
    return;
  }
  hoverName.textContent = '—';
});

const selectRegion = (region) => {
  map.querySelectorAll('.region.is-selected').forEach((el) => {
    el.classList.remove('is-selected');
  });
  region.classList.add('is-selected');
  selectedName.textContent = region.dataset.name ?? '尚未選取';
};

map.addEventListener('click', (event) => {
  const region = regionFromEvent(event);
  if (!region) {
    return;
  }
  selectRegion(region);
});

map.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }
  const region = regionFromEvent(event);
  if (!region) {
    return;
  }
  event.preventDefault();
  selectRegion(region);
});
