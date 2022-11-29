$(document).ready(function () {
    gsap.registerPlugin(Flip);
    const header = $(".header");
    let lastClickImage, click=false;;
    $(".gallery").click(function(e) {
        showImage(e)
    });
    $(".header").click(function(e) {
        backImage(e);
    });

    const showImage = function(e) {
        if (click) {
			backImage(e);
		}
        click = true;
        const image = e.target;
        lastClickImage = e.target.parentNode;   
        console.log(e.target)
        const state = Flip.getState(image);
        header.append(image);
        Flip.from(state, {
            duration: 0.6,
            ease: "sine.out",
            absolute: true
        });
        console.log(lastClickImage)     
    } 

    const backImage = function(e) {
        const image = 
            document.querySelector(".header img");
        console.log(image)
        const state = Flip.getState(image);
        lastClickImage.append(image);
        click = false;
        Flip.from(state, {
            duration: 0.6,
            ease: "sine.out",
            absolute: true
        });
        lastClickedCard = null;
    }

})


