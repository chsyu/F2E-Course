$(document).ready(function(){

    
    
    $(".closedoor").hover(function(){
        $(".closedoor").css("opacity", 0 );
        $(".opendoor").css("opacity", 1 );
        
        
    },function(){
        $(".closedoor").css("opacity", 1 );
        $(".opendoor").css("opacity", 0 );
        
    });

    $(".closedoor").click(function(){
       window.location.href='index_home.html';
    });


    
    

    //$('.closedoor').hide();
    //$("p").hide();
    //$('p').css('color','red');
    
});

const start_b = document.querySelector(".page0");
const pom_t1 = document.querySelector(".pom1");
const pom_t2 = document.querySelector(".pom2");
const itb = document.querySelector(".closedoor");
const type = document.querySelector(".test");
    

const t0 = new TimelineMax();
    
t0.fromTo(start_b,3,{ y:"-100%" },{y:"0%",ease:Power2.easeInOut} )
.fromTo(pom_t1,2,{ opacity:"0" },{opacity:"1",ease:Power2.easeInOut} )
.fromTo(pom_t2,2,{ opacity:"0" },{opacity:"1",ease:Power2.easeInOut},"-=1.5")
.fromTo(type,2,{ opacity:"0" },{opacity:"1",ease:Power2.easeInOut},"-=1.5")
.fromTo(itb,2,{ opacity:"0" },{opacity:"1",ease:Power2.easeInOut},"-=1.5")

;


var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 8.5) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

