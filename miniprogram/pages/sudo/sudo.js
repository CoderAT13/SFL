// miniprogram/pages/sudo/sudo.js
const app = getApp()
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();
var have_checked = 0;
var points = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task_name: "CoderS",
    task_description: "null",
    task_point: 0,
    userid: "",
    sub_info: "",
    waitingQueue: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = this;
    db.collection("waitingCheckTasks").where({
      checked: false
    }).get({
      success(res){
        tmp.setData({
          waitingQueue: res.data,
          userid: res.data[0].user_id,
          sub_info: res.data[0]._id,
          task_name: res.data[0].task.task_name,
          task_description: res.data[0].task.task_description,
          task_point: res.data[0].task.task_point,
        })
        //console.log(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 分数改变slider
   */
  pointsChange: function(e){
    //console.log(e.detail.value);
    points = e.detail.value;
  },

  /**
   * 提交分数并上传到对应的user的accuPoints里
   */
  submit: function(e){
    var tmp = this;
    db.collection("waitingCheckTasks").doc(sub_info).update({
      data:{
        checked: true
      },
      success: function(res){
        have_checked++;
        console.log("checked success")
      }
    })
    var user = db.collection("UserInfo").doc(tmp.data.userid);
    var user_points = 0;
    user.get({
      success: function(res){
        user_points = res.data.accuPoint;
        user_points += points;
        user.update({
          data:{
            user_points: user_points
          },
          success: console.log("update points success")
        })
      }
    })
  },

  /**
   * 下一条审核任务
   */
  next: function(e){
    var queue = this.data.waitingQueue;
    if (have_checked < queue.length()){
      this.setData({
        userid: queue[have_checked].user_id,
        sub_info: queue[have_checked]._id,
        task_name: queue[have_checked].task.task_name,
        task_description: queue[have_checked].task.task_description,
        task_point: queue[have_checked].task.task_point,
      })
    }
  }
})