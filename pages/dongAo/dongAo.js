
//获取应用实例
//const app = getApp()
import F2 from '@antv/wx-f2';
var _ = require('../../utils/underscore.js');
var util = require('../../utils/util.js');

//var yuming = 'slope.anew-eco.com'
var yuming = 'weixin.zktop.com'

let chart = null
let chart2 = null
let chart3 = null
let data = null
let arrWeiyi = []
let arrShidu = []
let arrWendu = []
let arrTest = []
let padding = [70, 124]
let paddingV = 70
let padding2 = [70, 90]
let paddingV2 = 80
let yuzhiWeiyi = 10
let yuzhiShidu = 20
let yuzhiWendu = 25
let shiduMax = 60
function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
  data = arrWeiyi
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    padding: ['auto', 'auto', paddingV2, 'auto'],

  });

  chart.source(data, {
    date: {
      range: [0, 1],
      type: 'timeCat',
      mask: 'MM-DD',

    },
    value: {
      min: -20,
      max: 20,
      tickCount: 8,
      formatter: function formatter(val) {
        return val.toFixed(2) + 'mm';
      }
    },

    // sales: {
    //   tickCount: 5
    // }
  });
  chart.scale('year', {
    range: [0, 1]
  });
  chart.guide().line({ // 绘制辅助线
    start: ['min', yuzhiWeiyi],
    end: ['max', yuzhiWeiyi],
    style: {
      stroke: '#FF4D4F',
      lineDash: [2]
    }
  });
  chart.guide().line({ // 绘制辅助线
    start: ['min', -yuzhiWeiyi],
    end: ['max', -yuzhiWeiyi],
    style: {
      stroke: '#FF4D4F',
      lineDash: [2]
    }
  });
  chart.guide().text({ // 绘制辅助文本
    position: ['max', yuzhiWeiyi],
    content: '阈值' + yuzhiWeiyi,
    offsetY: -5,
    style: {
      fill: '#FF4D4F',
      textAlign: 'end',
      textBaseline: 'bottom'
    }
  });
  chart.guide().text({ // 绘制辅助文本
    position: ['max', -yuzhiWeiyi],
    content: '阈值' + -yuzhiWeiyi,
    offsetY: -5,
    style: {
      fill: '#FF4D4F',
      textAlign: 'end',
      textBaseline: 'bottom'
    }
  });

  chart.legend({ position: 'bottom', align: 'left' });
  chart.tooltip({

    custom: true, // 自定义 tooltip 内容框
    onChange: function onChange(obj) {
      var legend = chart.get('legendController').legends.bottom[0];
      var tooltipItems = obj.items;
      var legendItems = legend.items;
      var map = {};
      legendItems.map(function (item) {
        map[item.name] = _.clone(item);
      });
      tooltipItems.map(function (item) {
        var name = item.name;
        var value = item.value;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(_.values(map));
    },
  })
  chart.axis('year', {
    tickLine: {
      length: 4,
      stroke: '#e8e8e8',
      lineWidth: 1
    },
    label: {
      textAlign: 'end',
      textBaseline: 'middle',
      rotate: Math.PI / -4
    }
  });

  chart.line().position('year*value').color('type').size(2);
  chart.point().position('year*value').color('type').size(2);
  chart.render();
  return chart;
}
function initChart2(canvas, width, height, F2) { // 使用 F2 绘制图表
  data = arrShidu
  chart2 = new F2.Chart({
    el: canvas,
    width,
    height,
    padding: ['auto', 'auto', paddingV2, 'auto'],

  });

  chart2.source(data, {
    date: {
      range: [0, 1],
      type: 'timeCat',
      mask: 'MM-DD',

    },
    value: {
      min: 0,
      max: shiduMax,
      tickCount: 4,
      formatter: function formatter(val) {
        return val.toFixed(1) + '%';
      }
    },

    // sales: {
    //   tickCount: 5
    // }
  });
  chart2.scale('year', {
    range: [0, 1]
  });
  chart2.guide().line({ // 绘制辅助线
    start: ['min', yuzhiShidu],
    end: ['max', yuzhiShidu],
    style: {
      stroke: '#FF4D4F',
      lineDash: [2]
    }
  });
  chart2.guide().text({ // 绘制辅助文本
    position: ['max', yuzhiShidu],
    content: '阈值' + yuzhiShidu,
    offsetY: -5,
    style: {
      fill: '#FF4D4F',
      textAlign: 'end',
      textBaseline: 'bottom'
    }
  });

  chart2.legend({ position: 'bottom', align: 'left' });
  chart2.tooltip({

    custom: true, // 自定义 tooltip 内容框
    onChange: function onChange(obj) {
      var legend = chart2.get('legendController').legends.bottom[0];
      var tooltipItems = obj.items;
      var legendItems = legend.items;
      var map = {};
      legendItems.map(function (item) {
        map[item.name] = _.clone(item);
      });
      tooltipItems.map(function (item) {
        var name = item.name;
        var value = item.value;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(_.values(map));
    },
  })
  chart2.axis('year', {
    tickLine: {
      length: 4,
      stroke: '#e8e8e8',
      lineWidth: 1
    },
    label: {
      textAlign: 'end',
      textBaseline: 'middle',
      rotate: Math.PI / -4
    }
  });

  chart2.line().position('year*value').color('type').size(2);
  chart2.point().position('year*value').color('type').size(2);
  chart2.render();
  return chart2;
}

function initChart3(canvas, width, height, F2) { // 使用 F2 绘制图表
    data = arrWendu
    chart3 = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: ['auto', 'auto', paddingV2, 'auto'],

    });

    chart3.source(data, {
        date: {
            range: [0, 1],
            type: 'timeCat',
            mask: 'MM-DD',

        },
        value: {
            min: 0,
            //max: shiduMax,
            tickCount: 4,
            formatter: function formatter(val) {
                return val.toFixed(1) + '℃';
            }
        },

        // sales: {
        //   tickCount: 5
        // }
    });
    chart3.scale('year', {
        range: [0, 1]
    });
    chart3.guide().line({ // 绘制辅助线
        start: ['min', yuzhiWendu],
        end: ['max', yuzhiWendu],
        style: {
            stroke: '#FF4D4F',
            lineDash: [2]
        }
    });
    chart3.guide().text({ // 绘制辅助文本
        position: ['max', yuzhiWendu],
        content: '阈值' + yuzhiWendu,
        offsetY: -5,
        style: {
            fill: '#FF4D4F',
            textAlign: 'end',
            textBaseline: 'bottom'
        }
    });

    chart3.legend({ position: 'bottom', align: 'left' });
    chart3.tooltip({

        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
            var legend = chart3.get('legendController').legends.bottom[0];
            var tooltipItems = obj.items;
            var legendItems = legend.items;
            var map = {};
            legendItems.map(function (item) {
                map[item.name] = _.clone(item);
            });
            tooltipItems.map(function (item) {
                var name = item.name;
                var value = item.value;
                if (map[name]) {
                    map[name].value = value;
                }
            });
            legend.setItems(_.values(map));
        },
    })
    chart3.axis('year', {
        tickLine: {
            length: 4,
            stroke: '#e8e8e8',
            lineWidth: 1
        },
        label: {
            textAlign: 'end',
            textBaseline: 'middle',
            rotate: Math.PI / -4
        }
    });

    chart3.line().position('year*value').color('type').size(2);
    chart3.point().position('year*value').color('type').size(2);
    chart3.render();
    return chart3;
}
Page({
  data: {

    porjectArr: [
      {
        title: '京张高铁边坡安全监测',
        apiUrl: 'https://' + yuming + '/jingzhang',
        buildcode: '1101F001',
        devcodeWeiyi: '1101F00100010O08',
        devcodeShidu: '1101F00100010K03'
      },
      {
        title: '京沈高铁边坡安全监测',
        apiUrl: 'https://' + yuming + '/jingshen',
        buildcode: '1308F0001',
        devcodeWeiyi: '1308F00010010O09',
        devcodeShidu: '1308F00010010K01'
      },
      {
        title: '冬奥会边坡安全监测',
        apiUrl: 'https://' + yuming + '/owg',
        buildcode: '1101F001',
        devcodeWeiyi: '1101F00100010O07',
        devcodeShidu: '1101F00100010K05',
        devcodeWendu: '1101F00100010T09'
      }
    ],
    imgUrlArr: [

      'https://' + yuming + '/pic/jingzhang.png',
      'https://' + yuming + '/pic/jingshen.png',
      'https://' + yuming + '/pic/owg.png',
    ],
    imgUrl: '',
    date: '请选择日期',
    devNum: '请选择设备',
    optionsNum: 0,
    session_id: '',
    salesTrendData: {
      lazyLoad: true   //延迟加载
    },
    opts: {
      onInit: initChart
    },
    opts2: {
      onInit: initChart2
    },
    opts3: {
        onInit: initChart3
    },
    startTime: '',
    endTime: '',
    today: '',
    devArr: [],
    devArrIndex: 0,
    devArrCode: [],
    tableData: [
      //{name:123,title:25.45,date:"2019-04-11 08"},
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange(e) {
    let that = this
    //console.log('dev发送选择改变，携带值为', e.detail.value)
    this.setData({
      devArrIndex: e.detail.value,
      devNum: that.data.devArr[e.detail.value]
    })
  },
  bindDateChange(e) {
    //console.log('date发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  getDevData: function () {
    const that = this
    if (that.data.devNum == '请选择设备') {
      wx.showToast({
        icon: 'none',
        title: '请选择设备'
      });
      return
    }
    if (that.data.date == '请选择日期') {
      wx.showToast({
        icon: 'none',
        title: '请选择日期'
      });
      return
    }
    wx.request({
      url: that.data.porjectArr[that.data.optionsNum].apiUrl + '/tsd/getDevData.shtml',
      header: {
        'content-type': 'application/json',
      },
      dataType: "json",
      jsonp: "callback",
      data: {
        'session_id': that.data.session_id,
        'timetype': 'hour',
        'starttime': that.data.date + ' 00:00:00',
        //'endtime': new Date(that.data.date + ' 23:59:59'.replace(/-/g, "/")).getTime() > new Date().getTime() ? that.data.date + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false }) : that.data.date + ' 23:59:59',
        'endtime': +new Date((that.data.date + ' 23:59:59').replace(/-/g, '/')) > +new Date() ? that.data.date + ' ' + new Date().toLocaleTimeString('chinese', { hour12: false }) : that.data.date + ' 23:59:59',
        'devcode': that.data.devArrCode[that.data.devArrIndex],

      },
      success: (res) => {
        let devData = []
        //console.log(res.data)
        if (res.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            devData.push({
              name: i + 1,
              title: res.data.data[i].data.rh ? res.data.data[i].data.rh.toFixed(1) + '%'
                : res.data.data[i].data.l.toFixed(3) + 'mm',
              date: res.data.data[i].time.substring(0, 13)
            })
          }
          that.setData({
            tableData: devData
          })
        } else {
          that.setData({
            tableData: null
          })
          wx.showToast({
            icon: 'none',
            title: '暂无数据'
          });
        }
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '网络错误...'
        });
      },
    })

  },
  onLoad: function (options) {
    let that = this;
    //console.log(options)
    //paddingV = padding[options.porject]
    //paddingV2 = padding2[options.porject]
    if (options.porject) {
      that.setData({
        imgUrl: that.data.imgUrlArr[options.porject],
        optionsNum: options.porject
      })
      wx.setNavigationBarTitle({
        title: that.data.porjectArr[options.porject].title
      })
    }
    that.setData({
      today: this.getNowFormatDate(0).substring(0, 10),
      startTime: this.getDate(this.getNowFormatDate(0), 0, 0, -1, 0, 0, 0),
      endTime: this.getNowFormatDate(0),
      session_id: wx.getStorageSync('session_id')
    })
    //let session_id = wx.getStorageSync('session_id');
    console.log(that.data.porjectArr[options.porject].apiUrl)
    //图表数据请求
    wx.request({
      url: that.data.porjectArr[options.porject].apiUrl + '/tsd/getBuildDevsData.shtml',
      header: {
        'content-type': 'application/json',
      },
      dataType: "json",
      jsonp: "callback",
      data: {
        'timetype': 'hour',
        'starttime': this.data.startTime,
        'endtime': this.data.endTime,
        'buildcode': this.data.porjectArr[options.porject].buildcode,
        'session_id': this.data.session_id
      },
      success: res => {
        console.log(res.data)
        
        if (!res.data) {
          wx.showToast({
            icon: 'none',
            title: '网络错误...'
          });
          return false
        }
        let devA = []
        let devB = []
        for (let i = 0; i < res.data.length; i++) {
          devA.push(res.data[i].devname)
          devB.push(res.data[i].devcode)
        }
        that.setData({
          devArr: devA,
          devArrCode: devB
        })
        let weiyi = res.data.filter((item) => {
          return item.type == 'O'
        })
        let shidu = res.data.filter((item) => {
          return item.type == 'K'
        })
        let wendu = res.data.filter((item) => {
            return item.type == 'T'
        })
        arrWeiyi = []
        arrShidu = []
        arrWendu = []

        let indexMax = weiyi[0].data.length
        let index = 0
        let indexMax2 = shidu[0].data.length
        let index2 = 0
        if (wendu.length<0){
            let indexMax3 = wendu[0].data.length
            let index3 = 0
        }
        
        for (var x = 0; x < weiyi.length; x++) {
          if (indexMax < weiyi[x].data.length) {
            indexMax = weiyi[x].data.length;
            index = x;
          }
        }
        for (let i = 0; i < weiyi.length; i++) {

          for (let j = 0; j < weiyi[index].data.length; j++) { //j < weiyi[0].data.length
            arrWeiyi.push({
              year: weiyi[index].data[j] ? weiyi[index].data[j].time.substring(5, 16) : null,
              type: weiyi[i].devname ? weiyi[i].devname : null,
              value: weiyi[i].data[j] ? weiyi[i].data[j].data.l : null
            })
          }
        }
        for (var x = 0; x < shidu.length; x++) {
          if (indexMax < shidu[x].data.length) {
            indexMax2 = shidu[x].data.length;
            index2 = x;
          }
        }
        for (let i = 0; i < shidu.length; i++) {
          for (let j = 0; j < shidu[index2].data.length; j++) { //j < shidu[0].data.length;
              
            // if (shidu[i].data[j].data.rh < yuzhiShidu){
            //       shiduMax = 40
            // }
            arrShidu.push({
              year: shidu[index2].data[j] ? shidu[index2].data[j].time.substring(5, 16) : null,
              type: shidu[i].devname,
              value: shidu[i].data[j] ? shidu[i].data[j].data.rh : null
            })
          }
        }
        if (wendu){
            for (var x = 0; x < wendu.length; x++) {
                if (indexMax < wendu[x].data.length) {
                    indexMax3 = wendu[x].data.length;
                    index3 = x;
                }
            }
            for (let i = 0; i < wendu.length; i++) {
                for (let j = 0; j < wendu[index3].data.length; j++) {
                    arrWendu.push({
                        year: wendu[index3].data[j] ? wendu[index3].data[j].time.substring(5, 16) : null,
                        type: wendu[i].devname,
                        value: wendu[i].data[j] ? wendu[i].data[j].data.rh : null
                    })
                }
            }
        }
        

        this.ecComponent = this.selectComponent('.column-dom1');
        this.ecComponent2 = this.selectComponent('.column-dom2');
        this.ecComponent3 = this.selectComponent('.column-dom3');
        this.ecComponent.init(initChart);
        this.ecComponent2.init(initChart2);
        this.ecComponent3.init(initChart3);
        //console.log(weiyi)
        //console.log(indexMax)
        //console.log(index)
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '网络错误...'
        });
      },
    })
    //阈值请求
    wx.request({  //位移
      url: that.data.porjectArr[options.porject].apiUrl + '/alarm/getAlarmValueByDevcode.shtml',
      dataType: "json",
      jsonp: "callback",
      data: {
        session_id: this.data.session_id,
        devcode: that.data.porjectArr[options.porject].devcodeWeiyi
      },
      success: (res) => {
        console.log(res)
        if (res.data.para_b) {
          yuzhiWeiyi = res.data.para_b
        }

      }
    })
    wx.request({  //湿度
      url: that.data.porjectArr[options.porject].apiUrl + '/alarm/getAlarmValueByDevcode.shtml',
      dataType: "json",
      jsonp: "callback",
      data: {
        session_id: this.data.session_id,
        devcode: that.data.porjectArr[options.porject].devcodeShidu
      },
      success: (res) => {
        if (res.data.para_a) {
          yuzhiShidu = res.data.para_a
        }
      }
    })
      wx.request({  //温度
          url: that.data.porjectArr[options.porject].apiUrl + '/alarm/getAlarmValueByDevcode.shtml',
          dataType: "json",
          jsonp: "callback",
          data: {
              session_id: this.data.session_id,
              devcode: that.data.porjectArr[options.porject].devcodeWendu
          },
          success: (res) => {
              if (res.data.para_a) {
                  yuzhiWendu = res.data.para_a
              }
          }
      })
  },
  //获取时间格式
  getDate(datetime, year, month, date, hour, minute, second) {
    datetime = datetime.replace(/-/g, '/');
    var now = new Date(datetime);
    var year = now.getFullYear() + year;
    var month = now.getMonth() + month;
    var date = now.getDate() + date;

    var hour = now.getHours() + hour;
    var minute = now.getMinutes() + minute;
    var second = now.getSeconds() + second;

    var date = new Date(year, month, date, hour, minute, second);
    return this.getNowFormatDate(date);
  },
  //获取当前时间格式
  getNowFormatDate(datetime) {
    var date;
    if (datetime == 0) {
      date = new Date();
    } else {
      date = new Date(datetime);
    }

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var Hours = date.getHours()
    var Minutes = date.getMinutes()
    var Seconds = date.getSeconds()

    if (Hours >= 0 && Hours <= 9) {
      Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
      Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
      Seconds = "0" + Seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + Hours + seperator2 + Minutes
      + seperator2 + Seconds;
    return currentdate;
  },
  //图片点击预览放大
  imgLook() {
    wx.previewImage({
      current: this.data.imgUrl, // 当前显示图片的http链接
      urls: [this.data.imgUrl] // 需要预览的图片http链接列表

    })
  }

})

