// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textImgUrl: '',
    bgImg: "",
    apiUrl:'',
    apiUrlArr: [
      'https://weixin.zktop.com/jingzhang',  //京张
      'https://weixin.zktop.com/jingshen'   //京沈
    ],
    dev: 0,
    textImgUrlArr: [
      "../../static/jz_login.png",
      "../../static/js_login.png",
      "../../static/dongaohui_login.png"
    ],
    bgImgUrl: [
      "https://weixin.zktop.com/pic/jzhang_iphone_bg.jpg",
      "https://weixin.zktop.com/pic/js_iphone_bg.jpg",
      "https://weixin.zktop.com/pic/dongaohui_bg.jpg"
    ],

    username: '',
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this;
    that.setData({
      bgImg : that.data.bgImgUrl[options.num],
      textImgUrl : that.data.textImgUrlArr[options.num],
      apiUrl: that.data.apiUrlArr[options.num],
      dev: options.num
    })
    
    
  },
  userNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  //获取用户输入的密码
  
  login_index:function(e){
    let that = this
    if (that.data.username.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入用户名'
      });
      return;
    }
    if (that.data.pwd.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入密码'
      });
      return;
    }
    wx.request({
      url: that.data.apiUrl + '/user/login.shtml',
      data:{
        username: that.data.username,
        password: that.data.pwd
      },
      success:(res)=>{
        //console.log(res)
        if (res.data.status != 1) {
          wx.showToast({
            icon: 'none',
            title: '用户名或密码错误'
          });
          return;
        }
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 2000
        })
        wx.setStorage({
          key: 'session_id',
          data: res.cookies[0]['session_id']
        })

        wx.navigateTo({
          url: '../index/index?porject=' + that.data.dev,
        });

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