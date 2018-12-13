//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accuPoint: 10
  },
  //事件处理函数
  onLoad: function () {
    var tmp = this;
    wx.getStorage({
      key: 'userAllInfo',
      success: function(res) {
        console.log("getStorage",res);
        tmp.setData({
          accuPoint: res.data.accPoint
        })
      },
      fail: console.error
    })
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,
  click: function(){
    if (this.data.motto == "Hello World"){
      this.setData({ motto: 'Hi World' })
    }else{
      this.setData({ motto: 'Hello World' })
    }
  }
})
