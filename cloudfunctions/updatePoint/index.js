// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
cloud.init({
  env: 'surprise-for-life-afda2f'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //const wxContext = cloud.getWXContext()
  db.collection("userInfo").where({
    _openid: event.userid
  }).update({
    data: {
      user_points: event.user_points
    },
    success(res){
      return "update points success";
    } ,
    fail(res){
      return "update points failed";
    }
  })
  
}