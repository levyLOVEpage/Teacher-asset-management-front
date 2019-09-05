Page({

  /**
   * 页面的初始数据
   */
  data: {
    eunit: "领用单位",
    enum: "仪器编号",
    ename: "仪器名称",
    etype: "型号",
    isowner: false,
    hiddentype: true,
    currenttime: "",
    endtime: "",
    info: "",
    slides: [
      "/images/firsthead.jpg"
    ],
  },
  borrow: function() {
    var that = this
    var hiddentype = that.data.hiddentype
    if (hiddentype) {
      this.setData({
        hiddentype: false
      })
    } else {
      this.setData({
        hiddentype: true
      })
    }
  },
  beginChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currenttime: e.detail.value
    })
  },
  endChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var num = wx.getStorageSync('jwt_token');
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var username = wx.getStorageSync('name')
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var currenttime = Y + '-' + M + '-' + D
    var endtime = Y + '-' + M + '-' + D
    this.setData({
      currenttime: currenttime,
      endtime: endtime

    })
    wx.request({

      url: 'http://127.0.0.1:8000/equdetail/' + options.id,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${num}`
      },
      success: function(res) {
        // console.log(res.data.result)
        that.setData({
          equdetail: res.data[0]
        })
      }
    })
  },
  sub: function() {
    var that = this;
    var userid = wx.getStorageSync('user')
    var name = wx.getStorageSync('name')
    wx.request({
      url: 'http://127.0.0.1:8000/borrow/',
      method: 'POST',
      data: {
        ownername: that.data.equdetail.euser,
        ownernum: that.data.equdetail.eusernum,
        borrowname: name,
        borrownum: userid,
        starttime: this.data.currenttime,
        endtime: this.data.endtime,
        isactive: '1',
        equipname: that.data.equdetail.ename,
        equipnum: that.data.equdetail.enum

      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        // console.log(res.data.user.student_number)

        // wx.reLaunch({
        //   url: '../home/home'
        // });
        console.log(res.data)
        if (res.data == "error:isowner") {
          that.setData({
            info: "无法借用自己的设备!"
          })
          wx.showToast({
            title: '无法借用自己的设备!',
            icon: 'none',
            duration: 2000
          })
        }
        else if (res.data == "error:isexist") {
          that.setData({
            info: "该设备已经被借用!"
          })
          wx.showToast({
            title: '该设备已经被借用!',
            icon: 'none',
            duration: 2000
          })
        }
        else if (res.data == "error:other") {
          that.setData({
            info: "发生未知错误!"
          })
          wx.showToast({
            title: '发生未知错误!',
            icon: 'none',
            duration: 2000
          })
        }
        else{
          that.setData({
            info: "借阅成功!"
          })
          wx.showToast({
            title: '借阅成功!',
            icon: 'success',
            duration: 2000
          })
           wx.reLaunch({
          url: '../home/home'
        });
        }
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})