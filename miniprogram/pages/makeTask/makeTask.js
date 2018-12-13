// pages/makeTask/makeTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList:[
      {'value':"运动"},
      {'value':"学习"},
      {'value':"工作"},
      {'value':"情感"},
      {'value':"挑战自我"},
      {'value':"娱乐放松"}
    ]
  },

  radio: function (e) {
    let index = e.currentTarget.dataset.id;
    let tagList = this.data.tagList;
    for (let i = 0; i < tagList.length; i++) {
      this.data.tagList[i].checked = false;
    }
    if (this.data.tagList[index].checked) {
      this.data.tagList[index].checked = false;
    } else {
      this.data.tagList[index].checked = true;
    }
    let userRadio = tagList.filter((item, index) => {
      return item.checked == true;
    })
    this.setData({ "tagList": tagList });
    console.log(userRadio);
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
  },
  formReset: function () {
    console.log('form发生了reset事件');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})