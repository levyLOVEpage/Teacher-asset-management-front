Page({

  /**
   * 页面的初始数据
   */
  data: {
    eunit: "领用单位",
    enum: "仪器编号",
    ename: "仪器名称",
    etype: "型号",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({

      url: 'http://127.0.0.1:8000/equ/' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData(
          {
            equdetail: res.data
          }
        )
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

  }
})