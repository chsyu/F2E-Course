let hello = "I am from global..";
alert(hello);

(function(){
    let hello = "I am from invoking..";
    alert(hello);
})();

let age = 18;

function sub10(num){
  return num - 10;
}
let youngage = sub10(age);
alert("youngage = " + youngage);

let add10 = function(num){
  return num + 10;
};
let oldage = add10(age);
alert("oldage = " + oldage);

(function(){
  outage = 20;      //Global
  let height = 170; //Local
  if(outage == 20)
     height = 180;
  alert("height = " + height);
})();
alert("outAge = " + outage);
alert("height = " + height);
