/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:05:10
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 09:51:06
 * @FilePath: \vercel-node-app\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getMongoData = require('../../modules/getMongo');
module.exports = [
    {
        path: '/getMongoData',
        method: 'get',
        handler: getMongoData,
    },
]