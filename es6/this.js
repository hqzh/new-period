class Person {
  constructor(){
    this.name = 'tom'
  }
  getInfo (){
    return this.name;
  }
}

class student extends Person{
  constructor(){
    super(); // 所有方法都继承过来
    this.name = 'jim';
    super.name = 'lili'  // 修改的仍然是子类的name属性
  }

  print (){
    console.log(super.name)  // undefined
    return this.name;
  }
}

const stu = new student();
// 由此可以看出，子类被调用时，使用的均为子类的this(修改父类的this得来),即使使用父类的super来调用父类的方法，使用的仍然是子类的this
console.log(stu.print());  //jim
console.log(stu.getInfo()); //jim