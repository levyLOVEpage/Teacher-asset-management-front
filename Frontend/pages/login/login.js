Page({
  data: {
    loading: false,
    account: "",
    password:"",
    error: ""
  },

  onLoad: function () {
    var that = this;
    var user = wx.getStorageSync('user')
    var num = wx.getStorageSync('jwt_token')
    if(num){
      wx.reLaunch({
        url: '../home/home'
      });
    }
  },

  userInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  isLogin: function () {
    var that = this;
    var account = that.data.account;
    var password = that.data.password;
    wx.request({
      url: 'http://127.0.0.1:8000/jwt-auth/',
      method: 'POST',
      data: {
        username: account,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        // console.log(res.data.user.student_number)
  
        if (res.data.token){
          wx.setStorageSync('jwt_token', res.data.token)
          wx.setStorageSync('user', res.data.user)
          wx.setStorageSync('name', res.data.name)
          that.setData(
            {
              loading: true
            }
          );
          wx.reLaunch({
            url: '../home/home'
          });

        }
        else {

          that.setData(
            {
              error: "账号或密码错误!",
            }
          );
        }
      },
      
      fail: function () {
        that.setData(
          {
            error: "服务维护中...."
          }
        )
      }

  })
  }
})