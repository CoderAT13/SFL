// pages/taskDetails/taskDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskName:"任务名",
    taskDetails:"任务详情",
    tag: "",
    isFinished: 0,
    accuPoint:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = this;
    var taskId;
    wx.getStorage({
      key: 'taskId',
      success: function (res) {
        taskId = res.data;
        console.log("taskId", taskId);
        const db = wx.cloud.database();
        db.collection('Tasks').where({
          _id: taskId
        }).get({
          success(res) {
            console.log(res.data);
            tmp.setData({
              taskName: res.data[0].missionInfo.inputName,
              taskDetails: res.data[0].missionInfo.inputDetails,
              tag: res.data[0].tags
            })
            // res.data 包含该记录的数据
            console.log(res.data)
          }
        })
      },
      fail: console.error,
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
    //新增 begin
    this.cardAni = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.cardAni.translate(0, 10).step();
    this.setData({ cardAni: this.cardAni.export() });
    //新增 end
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

  }
})