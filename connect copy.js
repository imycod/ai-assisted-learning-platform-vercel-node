/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-26 09:29:10
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-07-26 11:53:14
 * @FilePath: \pms-pcd:\studio\node-server\server-mongodb-base\models.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const mongodb = require('mongodb');

const dotenv = require('dotenv')

const path = require('path');

const dotenvPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

const confEnv = dotenv.config({ path: dotenvPath });

const db = require('./config/db.js')

const environment = confEnv.parsed.NODE_ENV

const { database, host, port, dialect, cluster } = db[environment].databases

const MongoClient = mongodb.MongoClient;
const ServerApiVersion= mongodb.ServerApiVersion;

let connectUrl = ''
let connectOptions = {}
if (environment === 'production') {
    console.log('Running in production mode.');
    const { is, password, suffix } = cluster
    if (is) {
        connectUrl = `${dialect}://${host}:${password}@${suffix}`
        connectOptions = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
    } else {
        connectUrl = `${dialect}://${host}:${port}`
    }
} else if (environment === 'development') {
    console.log('Running in development mode.');
    connectUrl = `${dialect}://${host}:${port}`
    connectOptions = { useUnifiedTopology: true }
} else if (environment === 'test') {
    console.log('Running in test mode.');
} else {
    console.log('Running in an unknown environment.');
}

module.exports = async (app) => {
    try {
        const client = await MongoClient.connect(connectUrl, connectOptions);

        const db = client.db(database);

        // 在此处可以执行数据库操作，或将数据库实例传递给你的路由和中间件
        // 例如：将数据库实例作为本地变量传递给路由
        app.locals.db = db;
        app.locals.client = client;

        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

