---
title: :blue_heart:ES6解构赋值
date: 2021-02-01
tags:
 - JavaScript
categories:
 - JavaScript
prev: ./20210109.md
next: ./20210107.md
---
### 为何使用解构功能
在ES5中，我们之前要想从对象或数组对象中获取特定的数据，通常都是这么做的，下面例子：
```JavaScript
let person = {
    name: "33",
    age: 23
}

let name = person.name;
let age = person.age;
```
上面example中，可以看到我们从`person`对象中获取到`name`和`age`属性并赋值给了新声明的变量`name`和`age`，这样声明两个变量没有问题，假如以后多了很多呢？

所以ES6为对象和数组提供了解构功能，将数据解构打散过程变得简单，可以从打散后更小的部分获取所需的信息。

### 对象解构
```JavaScript
let person = {
    name: "33",
    age: 23
}

let {name,age} = person;

console.log(name); // 33
console.log(age);  // 23

```
上面example中，`person.name`的值被赋值给了`name`变量，`person.age`的值被赋值给了`age`变量。只不过这里用的是对象的简写语法。
### 不要忘记初始化值
如果使用`var`、`let`、`const`用于声明解构，就必须初始化值也就是右侧的变量。
> 注意： 如果解构赋值右侧的值为`null` or `undefined`则抛出错误！
### 解构赋值
在上面，已经把解构说完了，那么解构赋值又是啥东西呢。就是，我们同样在给变量赋值时，使用解构语法。比如下面：
```JavaScript
let name = "小韩";
let age = 18;
let person = {
    name: "33",
    age: 23
}

// 使用解构赋值
({ name,age } = person);

console.log(name); // 33
console.log(age);  // 23

```
上面example中，我们先定义了`name`和`age`变量，并初始化值，然后又通过解构的赋值的方法将`name`和`age`变量从`person`对象中读取重新赋值。`注意！一定要用一对小括号包裹解构赋值语句，JavaScript`引擎会把花括号当成一个代码块，而语法规定代码块不能出现在赋值语句的左侧，用小括号包裹后可以将代码块转化成一个表达式，这样可以实现解构赋值。

接下来，在函数参数中使用解构赋值表达式
```JavaScript
let name = "小韩";
let age = 18;
let person = {
    name: "33",
    age: 23
}

function getObj(data) {
    console.log(data == person) // true 这里的data就是person
}
getObj({ name,age } = person);

console.log(name); // 33
console.log(age);  // 23

```
上面example中，调用`getObj`函数时传入了一个解构赋值表达式，由于`JavaScript`表达式的值为右侧的值，所以函数里的参数对象就是person对象，并且也将`name`和`age`变量重新赋值。

使用解构赋值时，如果指定的变量名称在对象中不存在，那么这个变量就是`undefined`的。

在指定的属性不存在时，可以设置一个默认值，跟函数参数默认值一样。比如下面这样：
```JavaScript
let person = {
    name: "33",
    age: 23
}
let { name, age, sex = "male" } = person;
console.log(name, age, sex) // 33 23 male

```
### 解构赋值起别名
在上面的代码中，解构表达式都是同变量同属性名，那么有时候解构出来的不想和这个属性名称一样，怎么办呢？解构表达式同意支持起别名，比如下面：
```JavaScript
let person = {
    name: "33",
    age: 23
}
let { name: userName, age: userAge } = person;
console.log(userName); // 33
console.log(userAge); // 23

```
上面example中，上面解构表达式中将`name`属性存储在了`userName`，将`age`属性存储在了`userAge`，那么这时就不能访问`name`和`age`了，因为他俩已经不是变量了。

### 解构赋值起别名也支持默认参数
```JavaScript
let person = {
    name: "33",
    age: undefined
}
let { name: userName, age: userAge = 23 } = person;
console.log(userName); // 33
console.log(userAge); // 23

```
### 对象多层嵌套解构
解构赋值也支持多层嵌套，语法跟上面讲的对象字面量也一样，可以更加细化的拆分解构。
```JavaScript
let person = {
    name: "33",
    age: 23，
    hobby: {
        name: '搬砖'
    }
}
let { hobby: { name: code = "code" } } = person;
console.log(code); // 搬砖

```
上面example中，可以看到上面多层解构语法跟普通解构是一样的，只不过在嵌套一层{}花括号而已。上面我们已经解构出来hobby属性，然后继续往里深入解构name属性并且赋予默认值，然后我们又给它起了个别名变量code。
### 对象解构雷区需注意
在使用多层嵌套解构时需要注意，你很有可能无意间创建了一个无效的表达式，就是解构空花括号，但是这个语法也是合法的，也什么都不会做，也不报错。
``` JavaScript
let person = {
    name: "33",
    age:23,
    hobby:{
        name:"搬砖"
    }
}

let { hobby {} } = person;

```
在上面语句中，可以看到深层解构hobby属性右侧是一个{}括号，但没有声明任何变量，这个语句也是合理的，但是不会报错。官方回答：这个语法在将来有可能被废弃掉，只要知道别这样写就行。
### 数组解构
数组解构语法跟对象解构语法差不多，只不过数组解构用`[]`字面量语法解构。
```JavaScript
let colors = ["red", "blue", "green"]
let [ red, blue ] = colors
console.log(red, blue) // red blue

```
### 数组解构和对象解构最大的区别，对象解构无序的而数组解构是有序的
```JavaScript
let colors = ["red", "blue", "green"];
let [ blue ] = colors
console.log(blue) // red

let ObjColors = {
    red: "red",
    blue: "blue",
    green: "green"
}
let { blue } = objColors
console.log(blue) // blue

```
上面example中，我们可以看到数组解构的blue变量是red值，所以数组解构是根据位置来的，一个位置对应一个值，不能像对象字面量那样对象里面有值我们就可以直接获取出来，不需要按照顺序。而数组解构是需要的顺序解构的。
如果我们只想获取数组第二个值，我们可以直接忽略第一个值的变量，只写一个占位符就可以。
```JavaScript
let colors = ["red", "blue", "green"]
let [ , blue ] = colors
console.log(blue) // blue

```
上面example中，只获取第二个值，所以把数组解构第一个值只占位不声明变量，然后在写入blue变量，这样就可以只获取第二个值了。
### 数组解构默认值
数组解构默认值跟对象解构默认值也是一样的，只要数组里面没有这个值或者这个值被设置为undefined那么默认值就会生效。
```JavaScript
let person = ['33',23];
let [ name, age, sex = "male" ] = person;
console.log(name, age, sex); // 33 23 male
```
### 数组多层嵌套解构
数组多层嵌套解构跟对象多层嵌套解构也是类似，就是语法不一样，数组使用[]按照顺序解构。
```JavaScript
let person = ["33",23,["搬砖","画画","羽毛球"]];
let [ name, age, [firstHobby]] = person;
console.log(name, age, firstHobby); // 33 23 搬砖
```
上面example中，可以看到多层解构时，使用[]方括号往里一层一层深入，层层抽取想要的数据。

**数组解构和对象解构语法都差不多类似，只需要注意数组解构使用[]，对象解构使用{}，及他们的雷区也都是一样的，我使用解构那就必须得初始化右侧的值，否则报错**

### 混合解构
上面都是说的单一对象解构，那么我们现在可以做一些混合解构，这就是数据结构和对象解构都要用上了。
```JavaScript
let person = {
    name:"33",
    age:23,
    sex:"male",
    hobby:["搬砖","画画","打羽毛球"]
}
let { name, sex, hobby:[, , lastHobby] } = person;
console.log(name, sex, lastHobby) // 33 23 打羽毛球
```
person是一个对象，里面定义了个人信息。然后到下面解构时，里面用到了对象解构和数组解构，然后我们知道数组解构只能根据位置来解构，所以使用数组占位符获取出来最后一个数组的值。

## 应用场景
### 对象解构
通常在ES5中，比如我们要做一个个人信息展现功能，先写个函数然后传递一个对象，在这个函数里面需要声明赋值一堆变量，而这些值都从传递进来的那个对象里面去取。
```JavaScript
function informationFn(data) {
    let name = data.name;
    let age = data.age;
    let sex = data.sex;
    let email = data.email;
    let phone = typeof data.phone != "undefined" ? data.phone : "暂无";
}
let person = {
    name:"33"，
    age:23,
    sex:"女",
    email:"1549620779@qq.com"，
    phone:undefined
}
informationFn(person)
```
上面例子中，可以看到代码虽然没有问题，但是这样一来代码太多，造成代码冗余，现在用ES6语法来实现下上面的功能。
```JavaScript
function informationFn({ name, age, sex, email, phone = "暂无" }) {
    console.log(name, age, sex, email, phone)
}
let person = {
    name: "33",
    age: 23,
    sex: "女",
    email: "1549620779@qq.com",
    phone: undefined
}
informationFn(person)

```
### 数组解构及赋值
```JavaScript
let a = 1;
let b = 2;
[ a, b ] = [b, a]
console.log(a, b)

```