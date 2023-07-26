/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-26 09:29:10
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-07-26 09:47:34
 * @FilePath: \pms-pcd:\studio\node-server\server-mongodb-base\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const usersRouter = require('./routes/users');
const expressjwt = require('express-jwt')
const config = require("./config/server.js")
const auth = require("./utils/auth.js")

const app = express();
const db = require("./connect.js")(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(expressjwt({secret: config.secretKey}).unless({path: [/^\/users\/.*$/]}))
// app.use(auth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.get('/test',async (req,res)=>{
    const token = req.header('Authorization');
    console.log(token)
    res.send({
        status: 200,
        message: '测试成功',
    })
})


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // 这次错误是由 token 解析失败导致的
    /**
     * token解析错误
     * token过期
     * token没携带
     */
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token,请重新能录',
        })
    }
    res.send({
        code: err.status || 500,
        result: 'error'
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
