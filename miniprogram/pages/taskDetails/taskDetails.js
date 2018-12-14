// pages/taskDetails/taskDetails.js
var taskId;
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();
var usr_id = "";
var taskBuilder = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigImg: "",
    taskName:"任务名",
    taskDetails:"任务详情",
    tag: "",
    is_official: false,
    isFinished: 0,
    accuPoint: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = this;
    wx.getStorage({
      key: '_id',
      success: function(res) {
        usr_id = res.data;
      },
    })
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
            taskBuilder = res.data[0]._openid;
            // 判断官方
            if (taskBuilder == "oLa764gw9AKVXkVEGV3qPZFEMtWk"){
              tmp.setData({
                is_official : true
              })
            }
            tmp.setData({
              taskName: res.data[0].missionInfo.inputName,
              taskDetails: res.data[0].missionInfo.inputDetails,
              accuPoint: res.data[0].accuPoint,
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

  },
  
  /**
   * 提交资料
   */
    data: {
      
    },
    changeBigImg() {
      let tmp = this;
      let openid = app.globalData.openid || wx.getStorageSync('openid');
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.showLoading({
            title: '上传中',
          });
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let filePath = res.tempFilePaths[0];
          const name = Math.random() * 1000000;
          const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,//云存储图片名字
            filePath,//临时路径
            success: res => {
              console.log('[上传图片] 成功：', res)
              that.setData({
                bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
              });
              let fileID = res.fileID;
              //把图片存到users集合表
              const db = wx.cloud.database();
              db.collection("waitingCheckTasks").add({
                data:{
                  fileID: fileID,
                  checked: false,
                  task:{
                    task_description: tmp.data.taskDetails,
                    task_name: tmp.data.taskName,
                    task_id: taskID,
                    task_point: tmp.data.accuPoint
                  },
                  user_id: usr_id
                },
                success(res){
                  
                }
              })
            },
            fail: e => {
              console.error('[上传图片] 失败：', e)
            },
            complete: () => {
              wx.hideLoading()
            }
          });
        }
      })
    },
})