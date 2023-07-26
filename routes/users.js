/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-26 09:29:10
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-07-26 11:07:28
 * @FilePath: \pms-pcd:\studio\node-server\server-mongodb-base\routes\users.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/server");

router.post('/registry', async function (req, res) {
    const { username, password, email } = req.body;
    console.log('req.body--------->', req.body)
    if (!username || !password || !email) {
        return res.status(400).send({
            message: "You need to include a username and password and email create a user"
        });
    }

    let usernameExists = null
    try {
        // usernameExists = await User.findOne({
        //     where: {
        //         name: username
        //     }
        // });
    } catch (e) {
        console.log('app----->create user username:', e.message)
    }

    if (usernameExists) {
        return res.status(400).send({
            message: `A user with the username ${username} already exists`
        })
    }

    let emailExists = null
    try {
        // emailExists = await User.findOne({
        //     where: {
        //         email
        //     }
        // });
    } catch (e) {
        console.log('app----->create user email:', e.message)
    }

    if (emailExists) {
        return res.status(400).send({
            message: `A user with the username ${email} already exists`
        })
    }

    try {
        // let newUser = await User.create({
        //     name: username,
        //     email,
        //     password: bcrypt.hashSync(password, 10),
        // });
        // return res.send(newUser);
    } catch (e) {
        return res.status(500).send({
            message: `Error: ${e.message}`
        });
    }
});
router.post('/login', async function (req, res) {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({
            message: "You need to include a email find a user"
        });
    }

    // const user = await User.findOne({
    //     where: {
    //         email
    //     }
    // });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the email ${email}`
        })
    }

    // 判断用户提交的登录信息是否正确，此处写死一个账号密码校验，在实际开发中肯定是需要数据库匹配。
    if (req.body.email !== user.email || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({ status: 1, msg: '登录失败' })
    }

    const { username } = req.body
    const tokenStr = jwt.sign({ username: username }, config.secretKey, { expiresIn: '1h' })
    res.send({
        status: 200,
        message: '登录成功！',
        token: tokenStr, // 要发送给客户端的 token 字符串
    })
});

router.get('/get', async (req, res) => {
    const { db, client } = req.app.locals

    console.log('db----------------->',db);
    const collection = db.collection('your-collection-name');
    try {
        const document = { name: 'John', age: 30, email: 'john@example.com' };
        const result = await collection.insertOne(document);
        console.log('Inserted document:', result.insertedId);
    } catch (error) {
        console.error('Failed to insert document:', error);
    }
    res.send('hhelo ')
})
module.exports = router;
