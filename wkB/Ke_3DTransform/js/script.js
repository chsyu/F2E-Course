
//using TweenMax.set() takes care of all vendor-prefixes
TweenMax.set(".container", {perspective:500});
TweenMax.set("#card", {transformStyle:"preserve-3d"});
TweenMax.set(".back", {rotationY:-180});
TweenMax.set([".back", ".front"], {backfaceVisibility:"hidden"});

$(".container").hover(
  function() {
    TweenMax.to($(this).find("#card"), 1.2, {rotationY:180, ease:Back.easeOut});
  },
  function() {
    TweenMax.to($(this).find("#card"), 1.2, {rotationY:0, ease:Back.easeOut});
  }
);
