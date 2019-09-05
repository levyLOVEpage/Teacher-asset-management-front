//index.js

Page({
  data: {
    slides: [
      "/images/home1.jpg",
      "/images/home1.jpg"
    ],
    bargainList: [
      {
        title: "测试设备",
        img: "/images/homeequ2.png",
        desc: "2101:数电学院办公室",
        base: "0000295Y",
        type: "KFR-33GW", 
      },
      {
        title: "测试设备",
        img: "/images/homeequ2.png",
        desc: "2101:数电学院办公室",
        base: "0000295Y",
        type: "KFR-33GW",
      },
      
    ]

  },
  equ:function(){
    wx.navigateTo({
      url: '/pages/borrow/borrow'
    })
  },
  equ2: function () {
    wx.switchTab
    ({
      url: '/pages/index/index'
    })
  },
  my: function () {
    wx.switchTab({
      url: '/pages/user/user'
    })
  },
  phone: function () {
    wx.switchTab({
      url: '/pages/addlist/addlist'
    })
  },
  click: function () {
    var that = this;
    var show = "";
    wx.scanCode({
      success: (res) => {
        this.show = res.result;
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
  onLoad: function () {
    var that = this;
    var equ = wx.getStorageSync('user')
    var num = wx.getStorageSync('jwt_token')
    wx.request({
      url: 'http://127.0.0.1:8000/equ/' + equ,
      header: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${num}`

      },
      success: function (res) {
        // console.log(res.data.result)
        that.setData(
          {
            equlist: res.data
          }
        )
      }
    })
  },
})