Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpwd:"",
    newpwd:"",
    confirmpwd:"",
    error:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  oldInput: function (e) {
    this.setData({
      oldpwd: e.detail.value
    })
  },
  newInput: function (e) {
    this.setData({
      newpwd: e.detail.value
    })
  },
  confirmInput: function (e) {
    this.setData({
      confirmpwd: e.detail.value
    })
  },
  isChange: function(){
    var that = this;
    var oldpwd = that.data.oldpwd;
    var newpwd = that.data.newpwd;
    var confirmpwd = that.data.confirmpwd;
    var user = wx.getStorageSync('user');
    var num = wx.getStorageInfoSync('jwt_token');
    if(newpwd==confirmpwd){
      wx.request({
        url: 'http://127.0.0.1:8000/changepwd/' + user,
        method: 'post',
        data: {
          oldpwd: oldpwd,
          newpwd: newpwd
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          // console.log(res.data.user.student_number)

          if (res.data=='success') {
            that.setData(
              {
                error:'修改成功'
              }

            );
            wx.reLaunch({
              url: '../home/home'
            });
          }
          else{
            that.setData(
              {
                error: '旧密码错误'
              }
            );
          }
        }
      })
    }
    else{
      that.setData(
        {
          error: "两次密码不一致",
        }
      )
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