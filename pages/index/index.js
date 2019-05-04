
//获取应用实例
//const app = getApp()
import F2 from '@antv/wx-f2';
var _ = require('../../utils/underscore.js');

let chart = null
let data = null
let arrTest = []

function initChart(canvas, width, height, F2) { // 使用 F2 绘制图表
    data = arrTest
    chart = new F2.Chart({
        el: canvas,
        width,
        height
    });

    chart.source(data, {
        date: {
            range: [0, 1],
            type: 'timeCat',
            mask: 'MM-DD'
        },
        value: {
            min:10,
            max: 60,
            tickCount: 4
        },

        // sales: {
        //   tickCount: 5
        // }
    });
    chart.guide().line({ // 绘制辅助线
        start: ['min', 40],
        end: ['max', 40],
        style: {
            stroke: '#FF4D4F',
            lineDash: [2]
        }
    });
    chart.guide().text({ // 绘制辅助文本
        position: ['max', 40],
        content: '预警值： 40',
        offsetY: -5,
        style: {
            fill: '#FF4D4F',
            textAlign: 'end',
            textBaseline: 'bottom'
        }
    });
    // chart.tooltip({
    //   showItemMarker: false,
    //   onShow(ev) {
    //     const { items } = ev;
    //     items[0].name = null;
    //     items[0].name = items[0].title;
    //     items[0].value = '¥ ' + items[0].value;
    //   }
    // });

    chart.tooltip({

        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
            var legend = chart.get('legendController').legends.top[0];
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

    chart.line().position('year*value').color('type');
    chart.render();
    return chart;
}

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
    date: '2016-09-01',

    salesTrendData: {
        lazyLoad: true   //延迟加载
    },
    opts: {
        onInit: initChart
    },
    
    dveArr: ['美国', '中国', '巴西', '日本'],
    dveArrIndex:0,
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
    bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            dveArrIndex: e.detail.value
        })
    },
    bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      imgUrl: that.data.imgUrlArr[options.porject]
    })

      wx.request({
          url: 'https://weixin.zktop.com/jingshen/tsd/getBuildDevsData.shtml',
          header: {
              'content-type': 'application/json',

          },
          dataType: "json",
          jsonp: "callback",
          data: {
              'timetype': 'hour',
              'starttime': '2019-04-28 13:07:22',
              'endtime': '2019-04-29 13:07:22',
              'buildcode': '1308F0001'
          },
          success: res => {
              //let aaa = []
              console.log(res.data)
                for(let i=0;i<res.data.length;i++){
                    //aaa.push({ name: res.data[i].devname})
                    for (let j = 0; j < res.data[0].data.length;j++){
                        arrTest.push({ year: res.data[0].data[j].time, 
                            type: res.data[i].devname,
                            value: res.data[i].data[j].data.rh})
                        }
                }
              console.log(arrTest)

          }
      })
  },
  
})

