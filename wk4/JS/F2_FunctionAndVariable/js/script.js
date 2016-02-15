var hello = "I am from global..";
alert(hello);

(function(){
    var hello = "I am from invoking..";
    alert(hello);
})();

var age = 18;

function sub10(num){
  return num - 10;
}
var youngage = sub10(age);
alert("youngage = " + youngage);

var add10 = function(num){
  return num + 10;
};
var oldage = add10(age);
alert("oldage = " + oldage);

(function(){
  outage = 20;      //Global
  var height = 170; //Local
  if(outage == 20)
     height = 180;
  alert("height = " + height);
})();
alert("outAge = " + outage);
alert("height = " + height);
