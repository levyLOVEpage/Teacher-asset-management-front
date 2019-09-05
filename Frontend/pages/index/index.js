var app = getApp()

Page({
  data: {
    eunit: "领用单位",
    enum: "仪器编号",
    ename: "仪器名称",
    etype: "型号",
    list: [{
      id: 'media',
      name: '我的设备',
      open: true
    }
    ]
  },
  onLoad: function () {
    var that = this;
    var equ = wx.getStorageSync('user')
    var num = wx.getStorageSync('jwt_token')
    wx.request({
      url: 'http://127.0.0.1:8000/equ/'+equ,
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
  widgetsToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }

})