$(document).ready(function(){

    $(".menu").hover(function(){
        $(".menu_text").css("color", 'rgb(116, 116, 116)' );
        $(".line1").css("background-color", 'rgb(116, 116, 116)' );
        $(".line2").css("background-color", 'rgb(116, 116, 116)' );
        $(".line3").css("background-color", 'rgb(116, 116, 116)' );
        
        
    },function(){
        $(".menu_text").css("color", 'white' );
        $(".line1").css("background-color", 'white' );
        $(".line2").css("background-color", 'white' );
        $(".line3").css("background-color", 'white' );
        
    });
    
    $("#pat1").hover(function(){
        $('#pat1').css("background-color", "black");  
    },function(){
        $('#pat1').css("background-color", "white");       
    });
    $("#pat2").hover(function(){
        $('#pat2').css("background-color", "black");  
    },function(){
        $('#pat2').css("background-color", "white");       
    });
    $("#pat3").hover(function(){
        $('#pat3').css("background-color", "black");  
    },function(){
        $('#pat3').css("background-color", "white");       
    });
    $("#pat4").hover(function(){
        $('#pat4').css("background-color", "black");  
    },function(){
        $('#pat4').css("background-color", "white");       
    });

});







