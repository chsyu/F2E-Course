// TweenMax.to('.box1', 1, {y: 450, delay: 1});
// TweenMax.to('.box2', 1, {y: 450, delay: 2});
// TweenMax.staggerTo(['.box1', '.box2'], 1, {y: 450}, 1);
// TweenMax.staggerFrom(['.box1', '.box2'], 1, { y: 450 }, 1);
TweenMax.staggerFromTo(
  ['.box1', '.box2'],
  1,
  {},
  {y:400, opacity:0.5, rotation: 1440, width: 100, height: 100, borderRadius: "25%"},
  0.5
);
