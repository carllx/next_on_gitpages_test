/**
 * 给 < next.config > 生成路由文件
 * 给 NAV 传送扼要信息
 *
 * 艺术家页面json模板,艺术家总目录
 * 详情每个艺术家分别建立文件夹
 * @type {object}
 *
 * artista -  艺术家头像图片
 * id - 数组 index
 * name - 姓名
 * description - 描述
 *
 */

const artistplan2018 = require("./artistplan2018.js");


const ARTISTI =  [
    artistplan2018,

]

// 发送到 nav artisti 使用
module.exports.artistInfo = ARTISTI.map(

        (item)=>{
            return {
                id:item.id,
                // avatar:item.avatar,??? 图片
                data:item.data,
            }
        }
    )

