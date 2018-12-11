// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

cloud.init({
  env: 'some-env-id'
})
// 云函数入口函数
exports.main = async (event, context) => {
  let { OPENID, APPID, UNIONID } = cloud.getWXContext()
  return {
    OPENID,
    APPID,
    UNIONID,
  };
}