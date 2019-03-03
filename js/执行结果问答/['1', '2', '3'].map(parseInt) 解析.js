
//['1', '2', '3'].map(parseInt) 解析
var arr=['1','2','3']
var new_array = arr.map(function callback(currentValue, index, array) {})
/*
这个callback一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。
而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。
parseInt(string, radix)
接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。
了解这两个函数后，我们可以模拟一下运行情况
如果省略该参数或其值为 0，则数字将以 10 为基础来解析
如果该参数小于 2 或者 大于 36，则 parseInt() 将返回 NaN。

parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //radix为1，无论如何都返回NaN
parseInt('3', 2) //该字符串中，没有二进制数，所以无法解析，返回NaN
map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]

合法的用法是parseInt('1111',2) //15  parseInt('1122',2) //3 后面的'22'无效,只解析二进制'11'为十进制的3
*/

// 如果您实际上想要循环访问字符串数组, 该怎么办？	map()然后把它换成数字？使用编号!
console.log(arr.map(parseInt));
['10','10','10','10','10'].map(Number);