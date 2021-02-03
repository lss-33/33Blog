---
title: 聊聊编程风格
date: 2021-02-03
tags:
 - 题外
categories:
 - 题外
---
### 1. 块级作用域
#### (1) let取代var
ES6提出了两个新的声明变量的命令：`let`和`const`。其中`let`完全可以取代`var`，因为两者语义相同，而且`let`没有副作用。
``` JavaScript
'use strict';

if (true) {
  let x = 'hello';
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}
```
上面代码如果用`var`替代`let`，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，`var`命令做不到这一点。
`var`命令存在变量提升效用，`let`命令没有这个问题。
```JavaScript
'use strict';

if (true) {
  console.log(x); // ReferenceError
  let x = 'hello';
}

```
上面代码如果使用`var`替代`let`，`console.log`那一行就不会报错，而是会输出`undefined`，因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。
所以，建议不再使用`var`，而是用`let`命令取代。
#### (2)全局常量和线程安全
在`let`和`const`之间，建议优先使用`const`，尤其是在全局环境，不应该设置变量，只应设置常量。
`const`优于`let`有几个原因。一个是`const`可以提醒阅读程序的人，这个变量不应该改变；另一个是`const`比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是JavaScript编译器会对`const`进行优化，所以多使用`const`，有利于提高程序的运行效率，也就是说`let`和`const`的本质区别，其实是编译器内部的处理不同。
```JavaScript
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];
```
`const`声明变量还有两个好处，一是阅读代码的人会立刻意识到不应该修改这个值，二是防止了无意间修改变量值导致的错误。
所有的函数都应该设置为常量。
长远来看，JavaScript可能会有多线程的实现，这时`let`表示的变量，只应出现在单线程运行的代码中，不能是多线程共享的，这样有利于保证线程安全。
### 2.字符串
静态字符串一律使用单引号或者反引号，不使用双引号。动态字符串使用反引号。
```JavaScript
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;
```
### 3.解构赋值
使用数组成员对变量赋值时，优先使用解构赋值。
```JavaScript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```
函数的参数如果是对象的成员，优先使用解构赋值。
```JavaScript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
```JavaScript
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```
### 4.对象
单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
```JavaScript
// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
```
对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法。
```JavaScript
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;
```
如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
```JavaScript
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
```
上面代码中，对象`obj`的最后一个属性名，需要计算得到。这时最好采用属性表达式，在新建`obj`的时候，将该属性与其他属性定义在一起。这样一来，所哟欧属性就在一个地方定义了。
另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
```JavaScript
var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};

```
### 5.数组
使用扩展运算符(...)拷贝数组。
```JavaScript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```
使用`Array.from`方法，将类似数组的对象转为数组。
```JavaScript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
### 6.函数
立即执行函数可以写成箭头函数的形式。
```JavaScript
(() => {
  console.log('Welcome to the Internet.');
})();
```
那些使用匿名函数作为参数的场合，尽量用箭头函数代替，因为这样更简洁，而且绑定了`this`。
```JavaScript
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
```
箭头函数取代`Function.prototype.bind`，不应再用`self/_this/that`绑定this。
```JavaScript
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
```
简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。
所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
```JavaScript
// bad
function divide(a, b, option = false ) {
}

// good
function divide(a, b, { option = false } = {}) {
}
```
不要在函数体内使用`arguments`，使用`rest`运算符(...)代替。因为`rest`运算符显式表明你想要获取参数，而且`arguments`是一个类似数组的对象，而`rest`运算符可以提供一个真正的数组。
```JavaScript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```
使用默认值语法设置函数参数的默认值
```JavaScript
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
```
### 7.Map结构
注意区分Object和Map，只有模拟现实世界的实体对象时，才使用Object。如果只是需要`key:value`的数据结构，使用Map结构。因为Map有内建的遍历机制。
```JavaScript
let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
```
### 8.Class
总是用Class，取代需要prototype的操作。因为Class的写法更简洁，更易于理解。
```JavaScript
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```
使用`extends`实现继承，因为这样更简单，不会有破坏`instanceof`运算的危险。
```JavaScript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```
### 9.模块
首先，Module语法是JavaScript模块的标准写法，坚持使用这种写法。使用`import`取代`require`。
```JavaScript
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';

```
使用`export`取代`module.exports`。
```JavaScript
// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;

```
如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，就不使用`export default`，`export default`与普通的`export`不要同时使用。
不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出(export default)。
```JavaScript
// bad
import * as myObject from './importModule';

// good
import myObject from './importModule';
```
如果模块默认输出一个函数，函数名的首字母应该小写。
```JavaScript
function makeStyleGuide() {
}

export default makeStyleGuide;
```
如果模块默认输出一个对象，对象名的首字母应该大写。
```JavaScript
const StyleGuide = {
  es6: {
  }
};

export default StyleGuide;
```
### 10.ESLint的使用
ESLint是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。
首先，在项目的根目录安装ESLint。
```JavaScript
$ npm install --save-dev eslint
```
然后，安装Airbnb语法规则，以及import、a11y、react插件。
```JavaScript
$ npm install --save-dev eslint-config-airbnb
$ npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```
最后，在项目的根目录下新建一个`.eslintrc`文件，配置ESLint。
```json
{
  "extends": "eslint-config-airbnb"
}
```
现在就可以检查，当前项目的代码是否符合预设的规则。
`index.js`文件的代码如下。
```JavaScript
var unused = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    console.log(message);
}

greet();
```
使用ESLint检查这个文件，就会报出错误。
```JavaScript
$ npx eslint index.js
index.js
  1:1  error  Unexpected var, use let or const instead          no-var
  1:5  error  unused is defined but never used                 no-unused-vars
  4:5  error  Expected indentation of 2 characters but found 4  indent
  4:5  error  Unexpected var, use let or const instead          no-var
  5:5  error  Expected indentation of 2 characters but found 4  indent

✖ 5 problems (5 errors, 0 warnings)
```
上面代码说明，原文件有五个错误，其中两个是不应该使用`var`命令，而要使用`let`或`const`；一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。
