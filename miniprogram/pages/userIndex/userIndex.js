//index.js
//获取应用实例
const app = getApp()
var user_id = "";
wx.cloud.init({
  env: "surprise-for-life-afda2f",
  traceUser: true
});
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    accuPoint: 10,
    is_sudo: false
  },
  //事件处理函数
  onLoad: function () {
    var tmp = this;
    
    wx.getStorage({
      key: '_id',
      success: function (res) {
        //console.log("user_id",res);
        
        user_id = res.data;
        db.collection("userInfo").where({
          _openid: res.data
        }).get({
          success(res){
            console.log(res)
            tmp.setData({
              accuPoint: res.data[0].accuPoint
            })
          }
        })
        if (user_id == "oLa764gw9AKVXkVEGV3qPZFEMtWk" ||
          user_id == "oLa764lvzSpNzMymL04xC7Ws_yVU" ||
          user_id == "oLa764mREJ7Le61CO8WZUUnLFueo" ||
          user_id == "oLa764u8VJTEWoFzcZeegV1b_fTE" ||
          user_id == "oLa764vE81KAgXtIaIApG291QkeA") {
          tmp.setData({
            is_sudo: true
          })
        }
      },
    })
    //这里是获取头像、openid、昵称用的
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
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
  /**
   * 跳转到管理员页面
   */
  

  onShow: function () {
    //新增 begin
    this.topBarAni1 = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni1.translate(0, 100).step();
    this.setData({ topBarAni1: this.topBarAni1.export() });
    this.topBarAni2 = wx.createAnimation({
      duration: 3000,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni2.translate(0, 100).step();
    this.setData({ topBarAni2: this.topBarAni2.export() });
    this.topBarAni3 = wx.createAnimation({
      duration: 3500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni3.translate(0, 50).step();
    this.setData({ topBarAni3: this.topBarAni3.export() });
    this.topBarAni4 = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.topBarAni4.translate(0, 50).opacity(1).step();
    this.setData({ topBarAni4: this.topBarAni4.export() });
    //新增 end
  },
  
  sudo: function () {
    wx.navigateTo({
      url: '../sudo/sudo',
    })
  },
})
