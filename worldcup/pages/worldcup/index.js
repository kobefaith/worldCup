import { matchlist, flagobj, worldcup } from "./matchlist";

//index.js
//获取应用实例
let convertDate = (datestr) => {
  const month = (datestr.slice(4, 5) === '0' ? datestr.slice(5, 6) : datestr.slice(4, 6)) + '月';
  const day = (datestr.slice(6, -1) === '0' ? datestr.slice(-1) : datestr.slice(6)) + '号';
  return month + day;
};
let formatDate = function() {
  const obj1 = {};
  Object.keys(matchlist).forEach(item => {
    obj1[ item ] = convertDate(item);
  });
  return obj1;
};
const dateobj1 = formatDate();
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    datearr: Object.keys(matchlist),
    matcharr: matchlist,
    dateobj: dateobj1,
    flagobj: flagobj,

  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '世界杯赛程',
      path: 'pages/worldcup/index'
    }
  },

  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../group/group?test=123'
    // })
    wx.switchTab({
      url: '../group/group',
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toImg: function() {
    let a = 2;
    wx.navigateTo({
      url: '../image/image?type=' + a
    })
  },
})
