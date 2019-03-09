/*
1.
当数据变化的时候，由于重新渲染生成新的dom性能开销很大，
那么很容易就引起了整个dom数的重绘跟回流，有没有可能我们只更新我们修改的那一小部分dom，而不要引起整个
dom的更改呢，diff算法可以做到，其实diff算法也好，vnode也好，说到底还是有操作到dom，只是说
我们并不需要关心我们操作哪些dom，我们要做的就是数据去驱动视图的更新，然后diff算法帮我们做最优化的处理。
这个过程就是：真实的dom生成了oldVnode，节点数据改变，生成了Vnode，跟原先的oldVnode，通过diff算法做比较，
然后使vnode上的修改 体现在oldvnode，一边进行比较，一边进行真实dom的更新 打补丁，而这真个diff过程，就是调用了
patch这个函数
*/

/*
2.
vnode(virtul dom) 其实是将复杂的庞大的dom对象，抽离成一个相对简单很多的对象，这个对象能够去
描述dom的基本结构跟信息
这里两个概念：vnode 成为虚拟节点，简称节点，dom称为元素节点，是真实存在的元素节点
比如：
<div>
<span>光光</span>
</div> 
对应的：
*/
vnode={
    tag:'div',
    children:[
        {tag:'span',children:[{text:'光光'}]}
    ]
}


/*
3.
diff的比较方式，是经过一层层的同层对比的，不会跨层级的。
<div>
    <p>123</p>
</div>

<div>
    <span>456</span>
</div>

这里只会div跟div做比较 
p跟span做比较
并不会说拿p跟div做比较，因为他们要符合相同的层级关系才能比较。
*/


/*
4.
因为数据data下的属性，都是通过Object.defineProperty($data,key,{set:function(){},get:function(){}})
进行了代理，所以会每次的设置属性，会触发set函数里面的Dep.notify去遍历对应属性所有的watcher，
订阅者watcher会调用patch去给真实dom打补丁，也就是patch(oldVnode,Vnode)；新旧节点的对比。
*/


/*
5.
patch(oldVnode,Vnode) 分析
*/
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
    	patchVnode(oldVnode, vnode)
    } else {
    	const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
    	let parentEle = api.parentNode(oEl)  // 父元素
    	createEle(vnode)  // 根据Vnode生成新元素
    	if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
    	}
    }
    // some code 
    return vnode
}

/*
patch(oldVnode,Vnode)函数 ： 接收两个参数 新节点Vnode,旧节点oldVnode

patch函数通过  sameVnode(oldVnode,vnode)  来判断两个节点是否“值得比较”，值得:才去执行patchVnode。

不值得的话: 就是很直接，直接替换对应的dom元素，保留其他相邻dom元素。
这个过程就去取到oldVnode对应的真实dom节点，调用api.parentNode取到 旧节点对应dom元素节点的父亲dom元素节点
然后去调用createEle(vnode）生成新的dom节点:vnode.el,之后通过api.insertBefore(parentEle,vnode.el,api.nextSibling(oEl))
先取到oEl旧的元素节点的后面的相邻元素节点，然后把vnode.el新元素节点插在前面，后面的相邻元素节点跟新元素节点一起插入父元素节点中。
相当于替换掉了这个oEl元素节点的位置。之后调用api.removeChild(parentEle, oldVnode.el)，移除旧的元素节点，之后把oldvnode=null 释放这块的内存，最后返回这个vnode；
*/

/*
6.sameVnode分析
但是我们判断值不值得去调用sameVnode去做vnode跟oldVnode的比较的，这一步做什么呢？
*/

