Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user')
    var num = wx.getStorageSync('jwt_token')
    wx.request({
      url: 'http://127.0.0.1:8000/equ/user/' + user,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${num}`
      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData(
          {
            usermes: res.data
          }
        )
      }
    })
  },
  logout:function(){
    wx.removeStorageSync('jwt_token')
    wx.removeStorageSync('user')
    wx.reLaunch({
      url: '../login/login'
    });

  },
  click: function () {
    var that = this;
    var show="";
    wx.scanCode({
      success: (res) => {
        this.show = res.result ;
        that.setData({
          show: this.show
        })
        wx.navigateTo({

          url: "../first/first?id=" + res.result

        });
        wx.showToast({
          title: '发现设备',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '暂无该设备信息',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
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
  
})