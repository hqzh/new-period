function* foo(x) {
  const a = yield x + 1;   //yield没有返回值，所以a是undefined；
  console.log(a,'aaaaaaaaaaaaaaaaaa')
  const b = yield 9;
  console.log(b,'bbbbbbbbbbbbbbbbbbbb');
}

var a = foo(5);
console.log(a.next()); 
console.log(a.next());  
console.log(a.next(8));// 代表上一个yield的返回值