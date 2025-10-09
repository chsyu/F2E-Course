let outage_global = 100;
function outageFn() {
   outage = 20;
   let outage_local = 50;
   console.log('in function', outage_global);
   console.log('in function', outage_local);
   console.log('in function', outage);
}

outageFn();

console.log('outside function', outage_global);
console.log('outside function', outage);
console.log('outside function', outage_local);
