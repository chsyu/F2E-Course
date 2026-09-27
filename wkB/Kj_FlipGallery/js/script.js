gsap.registerPlugin(Flip);
const header = document.querySelector(".header");
let lastClickImage = null;

const showImage = function (e) {

    if (e.target.matches("li")) return; //重複點擊同一元件不動作
    if (!!lastClickImage) {
        backImage(e); //如果已經點擊過，就先從header搬回圖片
    }
    const image = e.target;
    lastClickImage = e.target.parentNode;
    const state = Flip.getState(image);
    header.append(image);
    Flip.from(state, {
        duration: 0.6,
        ease: "sine.out",
        absolute: true
    });
}

const backImage = function (e) {
    const image =
        document.querySelector(".header img");
    const state = Flip.getState(image);
    lastClickImage.append(image);
    Flip.from(state, {
        duration: 0.6,
        ease: "sine.out",
        absolute: true
    });
    lastClickImage = null;
}

document.querySelector(".gallery").addEventListener("click", function (e) {
    showImage(e);
});
header.addEventListener("click", function (e) {
    backImage(e);
});
