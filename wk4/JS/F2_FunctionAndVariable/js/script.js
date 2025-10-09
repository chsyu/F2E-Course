let hello = "I am from global..";
alert(hello);

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

