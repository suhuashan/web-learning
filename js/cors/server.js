const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const app = new Koa;
let home = Router();
/*

*/
app.use(async(ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', ctx.request.headers.origin);
    ctx.set('Access-Control-Allow-Methods', 'PUT');
    ctx.set('Access-Control-Expose-Headers','keyword')
    ctx.set('Access-Control-Allow-Credentials','true')
    ctx.set('keyword','jgchen')
    ctx.set('Access-Control-Allow-Headers', 'request-header,content-type');
    await next();
})
// app.use(cors());
app.use(koaBody())
home.get('/', async (ctx) => {
    return ctx.body = {
        code: 200,
        message: '这个是首页'
    }

})

home.get('/ajax', async (ctx) => {
    console.log(ctx.cookies.get('name'))
    ctx.cookies.set('password','qqqqqq')
    console.log('get called')
    return ctx.body = {
        code: 200,
        data: ctx.request.query
    }
})
home.post('/ajax', async (ctx) => {
    console.log('post called')
    return ctx.body = {
        code: 200,
        data: ctx.request.body
    }
})
home.put('/ajax', async (ctx) => {
    console.log('put called')
    return ctx.body = {
        code: 200,
        data: ctx.request.body
    }
})
home.get('/jsonp', async (ctx) => {
    console.log('jsonp called')
    let callbackName = ctx.request.query.callback;
    let data = {
        code: 200,
        data: ctx.request.query
    }
    //返回体直接是函数调用，调用的实参是要后台要传递的数据~由于data是对象，需要先进行json格式化
    // console.log(`${callbackName}(${JSON.stringify(data)})`)
    //script标签加载会解析json内容 默认进行了json.parse
    return ctx.body = `${callbackName}(${JSON.stringify(data)})`
})
app.use(home.routes());
app.use(home.allowedMethods())
app.listen(3000, () => {
    console.log('start');
})