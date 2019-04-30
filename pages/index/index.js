//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    porjectArr: [
      {
        title: '京张高铁边坡安全监测',
        apiUrl: 'https://weixin.zktop.com/jingzhang',
        buildcode: '1101F001',
        devcodeWeiyi: '1101F00100010O08',
        devcodeShidu: '1101F00100010K03'
      },
      {
        title: '京沈高铁边坡安全监测',
        apiUrl: 'https://weixin.zktop.com/jingshen',
        buildcode: '1308F0001',
        devcodeWeiyi: '1308F00010010O09',
        devcodeShidu: '1308F00010010K01'
      },
      {
        title: '冬奥会边坡安全监测',
        //apiUrl:'http://36.110.66.218:8091', 
        //buildcode:'1308F0001',
        //devcodeWeiyi: '1308F00010010O09',
        //devcodeShidu: '1308F00010010K01'
      }
    ],
    imgUrlArr:[
      
      'https://weixin.zktop.com/pic/jingzhang.png',
      'https://weixin.zktop.com/pic/jingshen.png',

    ],
    imgUrl:'',

    tableData: [
      {name:123,title:25.45,date:"2019-04-11 08"},
      {name:123,title:25.45,date:"2019-04-11 08"},
      {name:123,title:25.45,date:"2019-04-11 08"},
      {name:123,title:25.45,date:"2019-04-11 08"},
      {name:123,title:25.45,date:"2019-04-11 08"} 
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      imgUrl: that.data.imgUrlArr[options.porject]
    })
  },
  
})
