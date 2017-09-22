# 配置后端环境
    $ yarn add koa mongoose
在这之前重温了一下mongoose文档，大体上概念为建一个模板(schema),将模板绑定到模型(modal)上,操作模型。下面的代码展示了如果新建一个用户,用户建好之后就可以插入到数据库中了,当然再次之前要检测此用户是否被注册。
```node
const Koa = require('koa');
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/chuanlaoda');
const db = mongoose.connection
db.on('error', (e) => {
  console.error(`connection error : ${e}`)
});
db.once('open', () => {
  console.log(`connected`)
});


const Schema = mongoose.Schema;
//初始化用户模板 包含三个field
const userSchema = new Schema({name: String, password: String, email: String, wxId: String});
//为模板绑定方法 检查用户是否可以注册
userSchema.methods.canRegister = function () {
  return new Promise((resolve, reject) => {
    this
      .model('User')
      .find({
        name: this.name
      }, (e, users) => {
        if (e) {
          return reject(e);
        }
        if (users.length === 0) {
          return resolve('can register');
        } else {
          return reject('user name already exists')
        }
      });
  })
};
//用用户模板实例化用户模型
const User = mongoose.model('User', userSchema);

//实例化用户
const u = new User({name: 'test'});

//检测用户是否能注册
u
  .canRegister()
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.error(res)
  })
  const app = new Koa();


app.use(async(ctx) => {
  ctx.body ='hello 船老大';
})

app.listen(3000);
console.log('[demo] start-quick is starting at port 3000')
```