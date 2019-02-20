const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {

    // 首先我们创建了三个常量用于表示状态，对于经常使用的一些值都应该通过常量来管理，便于开发及后期维护
    // 在函数体内部首先创建了常量 that，因为代码可能会异步执行，用于获取正确的 this 对象
    // 一开始 Promise 的状态应该是 pending
    // value 变量用于保存 resolve 或者 reject 中传入的值
    // resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.reason = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    // 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
    // 将当前状态更改为对应状态，并且将传入的值赋值给 value
    // 遍历回调数组并执行
    function resolve(value) {
        // 对于 resolve 函数来说，首先需要判断传入的值是否为 Promise 类型，是的话链式调用then函数
        // 为了保证函数执行顺序，需要将两个函数体代码使用 setTimeout 包裹起来
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = RESOLVED;
                that.value = value;
                that.resolvedCallbacks.map(cb => cb())
            }
        }, 0);

    }

    function reject(value) {
        setTimeout(() => {
            if (that.state = PENDING) {
                that.state = REJECTED;
                console.log('rejected called',that)
                that.reason = value;
                that.rejectedCallbacks.map(cb => cb())
            }
        }, 0);

    }
    try {
        //执行传入的参数并且将之前两个函数当做参数传进去
        fn(resolve, reject)
    } catch (error) {
        //可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
        reject(error)
    }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
    const that = this;
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }
    if (that.state === PENDING) {
        return promise2 = new MyPromise((resolve, reject) => {
            that.resolvedCallbacks.push(() => {
                try {
                    // 首先我们返回了一个新的 Promise 对象，并在 Promise 中传入了一个函数
                    // 函数的基本逻辑还是和之前一样，往回调数组中 push 函数
                    // 同样，在执行函数的过程中可能会遇到错误，所以使用了 try...catch 包裹
                    // 规范规定，执行 onFulfilled 或者 onRejected 函数时会返回一个 x，并且执行 Promise 解决过程，这是为了不同的 Promise 都可以兼容使用，比如 JQuery 的 Promise 能兼容 ES6 的 Promise
                    let x = onResolved(that.value);
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error);
                }
            })
            that.rejectedCallbacks.push(() => {
                try {
                    let x = onRejected(that.reason);
                    resolutionProcedure(promise2, x, resolve, reject)

                } catch (error) {
                    reject(error);
                }
            });
        })
    }
    if (that.state === RESOLVED) {
        return promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onResolved(that.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    }
    if (that.state === REJECTED) {
        return promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0);
        })
    }

    function resolutionProcedure(promise, x, resolve, reject) {
        let then, thenCalledOrThrow = false
        console.log(promise,x)
        //如果最终返回的promise 和 调用里面返回的x 相等 因为返回的x，是可以取到外层promise的索引的，会 指向相同的值, 使用 TypeError做为原因将promise拒绝，避免无限循环,看下面例子解释。
        if (promise === x) {
            return reject(new TypeError('Chaining cycle detected for promise!'))
        }

        //判断x是否是一个Promise，如果是，那么就直接把MyPromise中的resolve和reject传给then;
        //返回值是一个Promise对象，直接取它的结果做为promise2的结果
        if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
            try {
                then = x.then
                if (typeof then === 'function') { // typeof 

                    //x.then(resolve, reject);
                    then.call(x, function rs(y) {
                        if (thenCalledOrThrow) return
                        thenCalledOrThrow = true
                        return resolutionProcedure(promise, y, resolve, reject)
                    }, function rj(r) {

                        if (thenCalledOrThrow) return

                        thenCalledOrThrow = true

                        return reject(r)

                    })
                } else {
                    console.log('then is not a function:',that)
                    return resolve(x)
                }
            } catch (e) {
                if (thenCalledOrThrow) return

                thenCalledOrThrow = true

                return reject(e)
            }
        } else {
            // console.log(x,'is not function||object',that)

            return resolve(x)
        }

    }
}
// debugger;

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('settimeout')
        resolve('guang')
    }, 0);
})
let p2 = p1.then((value) => {
    console.log(value)
    //p2.then 会自动执行返回p2，然后p2.then()又执行，无穷无尽 
    return p2;
}, err => {
    console.log(err)
}).then(value => {
    console.log(value)
}, err => {
    console.log(err)
})