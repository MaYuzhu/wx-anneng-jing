// pages/login/login.js
//var yuming = 'slope.anew-eco.com'
var yuming = 'weixin.zktop.com'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textImgUrl: '',
    bgImg: "",
    apiUrl:'',
    apiUrlArr: [
      'https://' + yuming +'/jingzhang',  //京张
      'https://' + yuming +'/jingshen',   //京沈
      'https://' + yuming +'/owg'   //冬奥会
    ],
    dev: 0,
    textImgUrlArr: [
      "../../static/jz_login.png",
      "../../static/js_login.png",
      "../../static/dongaohui_login.png"
    ],
    bgImgUrl: [
      'https://'+yuming+'/pic/jzhang_iphone_bg.jpg',
      'https://'+yuming+'/pic/js_iphone_bg.jpg',
      'https://'+yuming+'/pic/dongaohui_bg.jpg'
    ],

    username: '',
    pwd: '',
    isDongAo:'',
  },

  clearUser: function () {
    let that = this;
    this.setData({
      username: ''
    })
    wx.setStorageSync('username' + that.data.dev, '')//that.data.username
    
  },
  clearPwd: function () {
    let that = this;
    this.setData({
      pwd: ''
    })
    wx.setStorageSync('password' + that.data.dev, '')//that.data.pwd
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
      dev: options.num,
      isDongAo: options.num
    })
    if (wx.getStorageSync('username' + that.data.dev)){
      that.setData({
        username: wx.getStorageSync('username' + that.data.dev),
        pwd: wx.getStorageSync('password' + that.data.dev)
      })
      //console.log("记住了密码")
    }
     
    
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
        wx.setStorageSync('session_id', res.data.session_id)
        wx.setStorageSync('username' + that.data.dev, that.data.username)//that.data.username
        wx.setStorageSync('password' + that.data.dev, that.data.pwd)//that.data.pwd
        
        
        if (that.data.isDongAo == 2) {
          wx.navigateTo({
            url: '../dongAo/dongAo?porject=' + that.data.dev,
          });
        }else{
          wx.navigateTo({
            url: '../index/index?porject=' + that.data.dev,
          });
        }

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