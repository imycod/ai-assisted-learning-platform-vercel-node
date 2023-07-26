/*
 * @Author: wuxs 317009160@qq.com
 * @Date: 2023-07-26 09:29:10
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-07-26 13:14:35
 * @FilePath: \pms-pcd:\studio\node-server\server-mongodb-base\config\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    development: {
        databases: {
            database: 'ai_assist', // 数据库名称
            host: 'localhost',
            port: 27017,
            dialect: 'mongodb',
        }
    },
    production: {
        databases: {
            database: 'Cluster0', // 数据库名称
            host: 'assist',
            dialect: 'mongodb+srv',
            port: 27017,
            cluster: {
                is: true,
                password: 'FWdlgKGSuq1xiaj6',
                suffix: 'cluster0.azilywt.mongodb.net/?retryWrites=true&w=majority'
            },
        }
    },
}


//assist FWdlgKGSuq1xiaj6
// const uri = "mongodb+srv://assist:<password>@cluster0.azilywt.mongodb.net/?retryWrites=true&w=majority";