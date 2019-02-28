function Foo() {
}
/*
其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。
因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，返回true
如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

具体可以看函数实现目录 里面的instanceof实现
*/
Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
/*
所有函数的原型是Function.prototype 其实所有函数是Function的实例 
 function 就是个语法糖，内部等同于 new Function()
*/
foo.__proto__===Function.prototype
Array.__proto__===Function.prototype
Object.__proto__===Function.prototype
//Function.prototype的原型是
Function.prototype.__proto__===Object.prototype