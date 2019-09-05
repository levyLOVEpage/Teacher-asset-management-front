Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchName:"",
    inputvalue:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var num = wx.getStorageSync('jwt_token')
    wx.request({
      url: 'http://127.0.0.1:8000/equ/people',
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${num}`
      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData(
          {
            userlist: res.data,
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
    
  },
  tel: function (e) {
    var nu = e.currentTarget.dataset.menu
    wx.makePhoneCall({
      phoneNumber: nu+"",
    })
  },
  searchpeo:function(e){
    this.setData({
      searchName: e.detail.value
    })
  },
  wxSearchConfirm:function(){
    var that = this;
    var num = wx.getStorageSync('jwt_token')
    var name = that.data.searchName
    console.log(that.data.searchName)
    wx.request({
      url: 'http://127.0.0.1:8000/equ/people/',
      method:'post',
      data:{
        searchName: name
      },
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${num}`
      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData(
          {
            userlist: res.data
          }
        )
      }

    })
  },
  wxSearchClear:function(){
    this.setData({
      inputvalue:''
    })
    this.onLoad()
  }
})