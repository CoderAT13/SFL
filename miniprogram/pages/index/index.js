//index.js
//获取应用实例
const app = getApp()
var usr_id = "";
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
let userID;
const db = wx.cloud.database();

Page({
  data: {
    motto: 'Hello World',
    avatarUrl: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msg1: {},
    msg2: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
        
        wx.setStorage({
          key: "_id",
          data: usr_id
        })
        db.collection('UserInfo').doc(res.result.openid).get({
          success: function (res) {
            tmp.setData({
              msg1: res.data
            })
            wx.setStorage({
              key: 'userAllInfo',
              data: res,
            })
            console.log("getCloudUserInfo: ",res);
          },
          fail: function () {
            db.collection("UserInfo").add({
              data: {
                _id: res.result.openid,
                accPoint: 0,
                dailyMission: {},
                randomMission: {}
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



    /*
    if (app.globalData.userInfo) {
     
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    */
  },
  navigate_to_missions: function(){
    wx.navigateTo({
      url: '../missions/missions'
    })
  }


})
