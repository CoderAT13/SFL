// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
cloud.init({
  env: 'surprise-for-life-afda2f'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.wait_id);
  db.collection("waitingCheckTasks").doc(event.wait_id).remove({
    success(res){
      return "nice!";
    }
  })
  return event.wait_id;
}