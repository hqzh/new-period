require("./this");

console.log(global.a,"3333")

this.c = 555;  //模块作用域中的this指向下面的打印，可以理解为导出就是挂在全局的this上

console.log(module.exports)