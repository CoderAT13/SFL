// pages/makeTask/makeTask.js
var tagTemp;
var typeTemp;
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
    ],
    items: [
      { name: 'D', value: '日任务' },
      { name: 'M', value: '月任务' },
      { name: 'Y', value: '年任务' },
    ]
  },

  radioChange(e) {
    typeTemp = e.detail.value;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
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
    tagTemp = tagList[index].value;
    this.setData({ "tagList": tagList });
    console.log(userRadio);
  },
  formSubmit: function (e) {
    const db = wx.cloud.database();
    var myDate = new Date();
    var myTime = myDate.toLocaleTimeString();
    db.collection('Tasks').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        missionInfo: e.detail.value,
        startDate: myTime,
        tags: tagTemp,
        type: typeTemp,
        //tags: [
        //  'cloud',
        //  'database'
        //],
        // 为待办事项添加一个地理位置（113°E，23°N）
        //location: new db.Geo.Point(113, 23),
        done: 0
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
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
    //新增 begin
    this.cardAni = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease-in-out",
      delay: 0,
      transformOrigin: '0 0 0'
    })
    this.cardAni.translate(0, 20).step();
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