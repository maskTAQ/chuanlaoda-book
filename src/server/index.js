const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
    console.log(ctx.req.cookie)
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')