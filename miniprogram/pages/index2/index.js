// pages/index/index.js
const app = getApp();
var usr_id = "";
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
let userID;
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstIn:true,
    showPlus: true,
    state: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dayTask: [
      {
        name:"跑步",
        isFinished:0
      },{
        name:"复习理综",
        isFinished:1
      }
    ],
    monthTask: [
      {
        name: "去一次海滩",
        isFinished: 0
      },{
        name: "回家",
        isFinished: 0
      }

    ],
    yearTask:[
      {
        name: "做一次全身检查",
        isFinished: 0
      }
    ]
  },
  toUserIndex: function(){
    wx.navigateTo({
      url: '../userIndex/userIndex'
    })
  },
  toMakeTask: function(){
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: '#FF7676',
      animation: {
        duration: 50,
        timingFunc: 'easeIn'
      }
    })
    this.plusAni = wx.createAnimation({
      duration: 250,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.setData({showPlus: false});
    this.plusAni.scale(45,45).step();
    this.setData({ plusAni: this.plusAni.export() });
    this.setData({firstIn:false});
    wx.navigateTo({
      url: '../makeTask/makeTask'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var tmp = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 传给云函数的参数
      success: function (res) {
        console.log(res.result) // 3
        usr_id = res.result.openid;
        console.log(usr_id);

        // 跨域传值用Storage
        wx.setStorage({
          key: "_id",
          data: usr_id
        })

        /*************************用户登陆时自动获取用户所有信息******************/
        db.collection('UserInfo').doc(res.result.openid).get({
          success: function (res) {
            console.log("Storage[userAllInfo]:",res.data);
            tmp.setData({
              msg1: res.data
            })
            wx.setStorage({
              key: 'userAllInfo',
              data: res.data,
            })
            console.log("getCloudUserInfo: ", res);
          },
          fail: function () {
            //  用户第一次登陆小程序创建一条记录
            db.collection("UserInfo").add({
              data: {
                _id: res.result.openid,
                accPoint: 0,
                selfTasks: {},    //自建的任务
                dTasks: {},       //已经完成过的dTasks
                mTasks: {},       //已经完成过的mTasks
                yTasks: {}        //已经完成过的yTasks
              },
              success: function (res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res);
              }
            })
          }
        })
      },
      fail: console.error
    }),

      //这里是获取头像、openid、昵称用的
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  hasUserInfo: true,
                  //msg1: "",
                  msg2: "Hello!   " + res.userInfo.nickName
                })

                //console.log(this.data.avatarUrl);
                console.log(res)
                db.collection("UserInfo").doc(usr_id).update({
                  data: {
                    NickName: res.userInfo.nickName
                  },
                  success: function (res) {
                    //console.log(res.data)
                  }
                })
              },
              fail: res => {
                console.log("failed")
              }
            })
          }
          else console.log("failed")
        },
        fail: res => {
          console.log("failed")
        }
      })

    if(this.data.state){
      console.log(this.data.state);
      setTimeout(function(){
        this.setData({
          state: false
        });
      }.bind(this),500)
    }
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
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: '#35A7C4',
      animation: {
        duration: 250,
        timingFunc: 'easeIn'
      }
    })
    if(!this.data.firstIn){
      this.plusAni = wx.createAnimation({
        duration: 250,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: '50% 50% 0'
      })
      this.setData({ showPlus: true });
      this.plusAni.scale(1, 1).step();
      this.setData({ plusAni: this.plusAni.export() })
    }
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
   * 获取用户头像昵称信息
   */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
   
})