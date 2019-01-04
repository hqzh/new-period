// generator函数会返回一个对象，该对象实现了一个Iterator,所以可以用for/of或Array.from();

function* Gen() {
  yield 'hi';
  yield 'tom';
  yield 'bye'
}

for (const item of Gen()) {
  console.log(item) //hi tom bye
}

console.log(Array.from(Gen()))  //[ 'hi', 'tom', 'bye' ]