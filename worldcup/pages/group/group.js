import { matchlist, flagobj, worldcup, groupobj } from "../worldcup/matchlist";
import { getCache, setCache, deleteCache } from "../../utils/cache";

const app = getApp()

Page({
  data: {
    flagobj: flagobj,
    groupobj: groupobj,
    complete: true,
    chooseobj: {
      'A': {
        '1': '',
        '2': '',
      },
      'B': {
        '1': '',
        '2': '',
      },
      'C': {
        '1': '',
        '2': '',
      },
      'D': {
        '1': '',
        '2': '',
      },
      'E': {
        '1': '',
        '2': '',
      },
      'F': {
        '1': '',
        '2': '',
      },
      'G': {
        '1': '',
        '2': '',
      },
      'H': {
        '1': '',
        '2': '',
      },
    }

  },

  onLoad: function(options) {
    console.log(options)
  },

  onReady: function() {
    deleteCache('SIXTEEN');
    // Do something when page ready.
    // console.log('111111   onReady')
  },

  onShow: function() {
    // Do something when page show.
    // console.log('111111   onShow')
  },


  //事件处理函数
  choseTeam: function(event) {
    const group = event.currentTarget.dataset.group;
    const team = event.currentTarget.dataset.team;
    const selectobj = this.data.chooseobj;
    if (selectobj[ group ][ '1' ] === team || selectobj[ group ][ '2' ] === team) {
      selectobj[ group ][ '1' ] = selectobj[ group ][ '1' ] === team ? '' : selectobj[ group ][ '1' ];
      selectobj[ group ][ '2' ] = selectobj[ group ][ '2' ] === team ? '' : selectobj[ group ][ '2' ];
    } else if (selectobj[ group ][ '1' ] === '' || selectobj[ group ][ '2' ] === '') {
      if (selectobj[ group ][ '1' ] === '') {
        selectobj[ group ][ '1' ] = team;
      } else if (selectobj[ group ][ '2' ] === '') {
        selectobj[ group ][ '2' ] = team;
      }
    }

    this.setData({
      chooseobj: selectobj
    })
    // 判断是否选够16强
    let buttonflag = false;
    Object.keys(this.data.chooseobj).some(item => {
      if (this.data.chooseobj[ item ][ '1' ] == '' || this.data.chooseobj[ item ][ '2' ] == '') {
        buttonflag = true;
        return true;
      }
    });
    this.setData({
      complete: buttonflag
    })
    return;
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
    setCache('SIXTEEN', this.data.chooseobj);
    wx.navigateTo({
      url: '/pages/knockout/knockout?chooseobj=' + this.data.chooseobj
    })
  },

  onLoad: function() {
  }
})
