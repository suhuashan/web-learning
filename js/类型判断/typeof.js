// typeof 对于原始类型来说，除了 null 都可以显示正确的类型
var foo = function () {}
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
//typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
//如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof
typeof [] // 'object'
typeof {} // 'object'
typeof null //'object'
typeof console.log // 'function'
/* 
typeof是怎么来判断变量的类型的 
js在底层存储变量时候，会在变量的机器码的低位1～3位存储其类型信息

000：对象
010：浮点数
100:字符串
110:布尔值
1:整数

但是对于undefined和null来说
null：所有机器码均为0
undefined：用 −2^30 整数来表示
typeof 在判断 null 的时候就出现问题了，由于 null 的所有机器码均为0，因此直接被当做了对象来看待
然而用 instanceof 来判断的话
null instanceof null // TypeError: Right-hand side of 'instanceof' is not an object 
右边的变量必须是一个包装对象，而不是那种typeof null===‘object’的bug导致的对象。

除了使用typeof instanceof 还可以使用Object.prototype.toString

*/