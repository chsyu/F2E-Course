const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

/**
 * 把 path 準備成「尚未畫出」的 dash 狀態。
 * 為什麼讀 getTotalLength：每條曲線長度不同，硬編碼 dash 會對不齊。
 */
const prepareDrawPath = (path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;
  return length;
};

const revealDrawPath = (path) => {
  path.style.strokeDashoffset = '0';
};

/* —— Demo 1：寫字／畫線 —— */
let drawTimeline = null;

const playDrawWriting = () => {
  const paths = [...document.querySelectorAll('.draw-path')];
  if (!paths.length) return;

  drawTimeline?.kill();
  paths.forEach(prepareDrawPath);

  // 為什麼用 timeline + stagger 感的 delay：模擬「一筆接一筆」的書寫節奏
  drawTimeline = gsap.timeline({ defaults: { ease: 'power1.inOut' } });

  paths.forEach((path) => {
    const delay = Number(path.dataset.delay ?? 0);
    drawTimeline.to(
      path,
      {
        strokeDashoffset: 0,
        duration: path.classList.contains('draw-underline') ? 0.9 : 1.15,
      },
      delay,
    );
  });
};

const initDrawDemo = () => {
  const paths = [...document.querySelectorAll('.draw-path')];

  if (prefersReducedMotion) {
    paths.forEach(revealDrawPath);
    return;
  }

  playDrawWriting();

  document.querySelector('#replay-draw')?.addEventListener('click', () => {
    playDrawWriting();
  });
};

/* —— Demo 2：ScrollTrigger 旅程圖 —— */
const initScrollDemo = () => {
  const path = document.querySelector('#journey-path');
  const traveler = document.querySelector('#traveler');
  const pctLabel = document.querySelector('#scroll-pct');
  const markers = [...document.querySelectorAll('.marker')];
  const mountains = [...document.querySelectorAll('.mountain')];
  const flagCloth = document.querySelector('.flag-cloth');

  if (!path || !traveler) return;

  const pathLength = path.getTotalLength();

  if (prefersReducedMotion) {
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = '0';
    const end = path.getPointAtLength(pathLength);
    traveler.setAttribute('transform', `translate(${end.x} ${end.y})`);
    gsap.set(markers, { scale: 1, transformOrigin: 'center' });
    gsap.set(mountains, { opacity: 0.55, y: 0 });
    gsap.set(flagCloth, { scaleX: 1, transformOrigin: 'left center' });
    if (pctLabel) pctLabel.textContent = '100';
    return;
  }

  prepareDrawPath(path);
  gsap.set(markers, { scale: 0, transformOrigin: 'center' });
  gsap.set(mountains, { opacity: 0, y: 40 });
  gsap.set(flagCloth, { scaleX: 0, transformOrigin: 'left center' });

  // 用 proxy 物件驅動旅人位置：scrub 時 onUpdate 會依進度取 path 上的點
  const journey = { progress: 0 };

  const placeTraveler = (progress) => {
    const point = path.getPointAtLength(progress * pathLength);
    traveler.setAttribute('transform', `translate(${point.x} ${point.y})`);
  };

  placeTraveler(0);

  // 為什麼 pin + scrub：固定畫面、捲動＝時間軸進度，適合「長路徑」敘事
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scroll-scene',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.scroll-pin',
      scrub: 0.6,
      onUpdate: (self) => {
        if (pctLabel) {
          pctLabel.textContent = String(Math.round(self.progress * 100));
        }
      },
    },
  });

  tl.to(
    mountains,
    {
      opacity: 0.55,
      y: 0,
      duration: 0.25,
      stagger: 0.05,
      ease: 'power2.out',
    },
    0,
  )
    .to(
      path,
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'none',
      },
      0.05,
    )
    .to(
      journey,
      {
        progress: 1,
        duration: 1,
        ease: 'none',
        onUpdate: () => placeTraveler(journey.progress),
      },
      0.05,
    )
    // 站點約略對應路徑進度：起點、兩彎、中段、終點
    .to(markers[0], { scale: 1, duration: 0.08 }, 0.06)
    .to(markers[1], { scale: 1, duration: 0.08 }, 0.28)
    .to(markers[2], { scale: 1, duration: 0.08 }, 0.5)
    .to(markers[3], { scale: 1, duration: 0.08 }, 0.72)
    .to(markers[4], { scale: 1, duration: 0.08 }, 0.92)
    .to(
      flagCloth,
      {
        scaleX: 1,
        duration: 0.12,
        ease: 'back.out(1.6)',
      },
      0.9,
    );
};

const init = () => {
  initDrawDemo();
  initScrollDemo();
};

init();
