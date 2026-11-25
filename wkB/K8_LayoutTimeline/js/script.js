const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const buildIntroTimeline = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 用 fromTo：先寫死起點，避免 gsap.set(opacity:0) 再 .from() 時結束值也被鎖成 0
  tl.fromTo(
    '[data-anim="brand"]',
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.5 },
  )
    .fromTo(
      '[data-anim="nav"]',
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      '-=0.25',
    )
    .fromTo(
      '[data-anim="copy"]',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 },
    )
    .fromTo(
      '[data-anim="cta"]',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45 },
      '-=0.25',
    )
    .fromTo(
      '[data-anim="card"]',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.14 },
      '-=0.35',
    )
    .fromTo(
      '[data-anim="footer"]',
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.2',
    );

  return tl;
};

const hideAnimated = () => {
  gsap.set('[data-anim]', { opacity: 0 });
};

const init = () => {
  if (prefersReducedMotion) {
    return;
  }

  hideAnimated();

  let intro = buildIntroTimeline();

  const replayBtn = document.querySelector('#replay-btn');
  replayBtn?.addEventListener('click', () => {
    intro.kill();
    gsap.set('[data-anim]', { clearProps: 'transform' });
    hideAnimated();
    intro = buildIntroTimeline();
  });
};

init();
