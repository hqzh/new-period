a = 5;
const b = 6;

console.log(this.a);  // undefined
console.log(global.a); // 5
console.log(module.exports);