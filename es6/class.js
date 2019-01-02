class Person{
  // 如果没有构造函数，声明一个类的时候会默认添加一个空的构造函数
  constructor(sex,age,name){
    this.sex = sex;
    this.age = age;
    this.name = name;
    // 类的方法也可以是箭头函数
    this.getAge = () => {
      console.log(this.age)  //20
    }
  }
  // 类的静态方法，只能通过类名调用
  static getName(){
    return this.name;  
  }
// 非静态方法，只能通过new的类调用
  getInfo(){
    console.log(this)  //Person { sex: 'man', age: '20', name: 'jam' }
    return this.sex + "," + this.age;
  }
}

class Sutdent extends Person {
  // 静态方法可以通过super调用父类的静态方法
  static getName1(){
    console.log(super.getName() + '....')  // Sutdent
  }
// super只能调用父类的方法，而不能调用父类的属性，因为方法是定义再原型链上，而属性是定义在类的内部
  getInfo1(){
    console.log(super.getInfo(),'getinfo');
    // console.log(super.getName() + '....')  报错，静态方法要再静态方法里面调用
  }
}

Sutdent.getName1();
new Sutdent().getInfo1();

const p = new Person('man','20','jam');
p.getInfo();
p.getAge();

console.log(Person.getName())  //Person

console.log(p.constructor === Person.prototype.constructor)  // true  由此可以证明es6对class的实现依旧是基于prototype