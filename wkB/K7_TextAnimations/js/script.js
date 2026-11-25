const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COUNTER_TARGET = 123456;

const playTitleEntrance = () => {
  // 為什麼用 from：從下方 150px、透明進場到現有樣式；stagger 讓兩行標題依序播放
  gsap.from('.title', {
    duration: 0.75,
    y: 150,
    opacity: 0,
    ease: 'power3.out',
    stagger: 1.5,
  });
};

const playCounter = () => {
  const counter = document.querySelector('#counter');
  if (!counter) return;

  // 重播前先歸零，避免第二次從中間數字接著跑
  counter.textContent = '0';

  // 為什麼用 snap.innerText: 1：避免小數跳動，讓計數器一次加整數 1
  gsap.to(counter, {
    innerText: COUNTER_TARGET,
    duration: 1,
    snap: {
      innerText: 1,
    },
  });
};

const init = () => {
  if (prefersReducedMotion) {
    const counter = document.querySelector('#counter');
    if (counter) counter.textContent = String(COUNTER_TARGET);
    return;
  }

  playTitleEntrance();
  playCounter();

  const replayBtn = document.querySelector('#replay-btn');
  replayBtn?.addEventListener('click', () => {
    gsap.killTweensOf('.title');
    gsap.killTweensOf('#counter');
    gsap.set('.title', { clearProps: 'all' });
    playTitleEntrance();
    playCounter();
  });
};

init();
