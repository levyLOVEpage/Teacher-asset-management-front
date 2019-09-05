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
    ],
    equlist:""
  },
  onLoad: function () {
    var that = this;
    var mynum = wx.getStorageSync('user')
    console.log(mynum)
    var num = wx.getStorageSync('jwt_token')
    wx.request({
      url: 'http://127.0.0.1:8000/borrowin/',
      method: 'post',
      header: {
        'content-type': 'application/json'

      },
      data:{
        mynum: mynum
      },
      success: function (res) {
        console.log(res.data)
        that.setData(
          {
            equlist:res.data
          }
        )
      }
    })
    wx.request({
      url: 'http://127.0.0.1:8000/borrowout/',
      method: 'post',
      header: {
        'content-type': 'application/json'

      },
      data: {
        mynum: mynum
      },
      success: function (res) {
        console.log(res.data)
        that.setData(
          {
            equlist2: res.data
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
  },
  delborrow:function(e){
    var id = e.target.dataset.id;
    var that = this;
    console.log(id);
    wx.request({
      url: 'http://127.0.0.1:8000/returnequ/'+id,
      method:"delete",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data =='Deleted'){
          wx.showToast({
            title: '归还成功',
          })
          that.onLoad()
        }
      }
    })
  }

})