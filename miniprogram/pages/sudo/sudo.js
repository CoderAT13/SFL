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
    waiting_id: "",
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
          waiting_id: res.data[0]._id,
          waitingQueue: res.data,
          userid: res.data[0].user_id,
          sub_info: res.data[0].fileID,
          task_name: res.data[0].task.task_name,
          task_description: res.data[0].task.task_description,
          task_point: res.data[0].task.task_point,
        })
        console.log(res.data);
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
    db.collection("waitingCheckTasks").doc(tmp.data.waiting_id).remove({
      success: console.log("remove success")
    })
    var user = db.collection("userInfo").where({
      _openid: tmp.data.userid
    });
    var user_points = 0;
    user.get({
      success: function(res){
        user_points = res.data[0].accuPoint;
        user_points += points;
        wx.cloud.callFunction({
          name: 'updatePoint',
          data:{
            userid: tmp.data.userid,
            user_points: user_points
          },
          success(res){
            console.log(res.result)
          },
          fail: console.error
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
        waiting_id: queue[have_checked]._id,
        userid: queue[have_checked].user_id,
        sub_info: queue[have_checked].fileID,
        task_name: queue[have_checked].task.task_name,
        task_description: queue[have_checked].task.task_description,
        task_point: queue[have_checked].task.task_point,
      })
    }
  }
})