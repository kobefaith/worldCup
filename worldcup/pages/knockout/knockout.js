import { matchlist, flagobj, worldcup } from "../worldcup/matchlist";
import { getCache, setCache } from "../../utils/cache";


const app = getApp()

Page({
  data: {
    chooseobj: {},
    worldcup: worldcup,
    champion: '',
    flagobj: flagobj,
    stage1: [
      {
        1: {
          team: 'A',
          order: '1',
        },
        2: {
          team: 'B',
          order: '2',
        },
      },
      {
        1: {
          team: 'C',
          order: '1',
        },
        2: {
          team: 'D',
          order: '2',
        },
      },
      {
        1: {
          team: 'E',
          order: '1',
        },
        2: {
          team: 'F',
          order: '2',
        },
      },
      {
        1: {
          team: 'G',
          order: '1',
        },
        2: {
          team: 'H',
          order: '2',
        },
      },
    ],
    stage2: [
      {
        1: '',
        2: '',
      },
      {
        1: '',
        2: '',
      },
    ],
    stage3: [
      {
        1: '',
        2: '',
      },
    ],
    stage4: [
      {
        1: '',
        2: '',
      }
    ],
    stage5: [
      {
        1: '',
        2: '',
      }
    ],
    stage6: [
      {
        1: '',
        2: '',
      }
    ],
    stage7: [
      {
        1: '',
        2: '',
      },
      {
        1: '',
        2: '',
      },
    ],
    stage8: [
      {
        1: {
          team: 'B',
          order: '1',
        },
        2: {
          team: 'A',
          order: '2',
        },
      },
      {
        1: {
          team: 'D',
          order: '1',
        },
        2: {
          team: 'C',
          order: '2',
        },
      },
      {
        1: {
          team: 'F',
          order: '1',
        },
        2: {
          team: 'E',
          order: '2',
        },
      },
      {
        1: {
          team: 'H',
          order: '1',
        },
        2: {
          team: 'G',
          order: '2',
        },
      },
    ],

  },
  onLoad: function(options) {

  },
  onReady: function() {
    const chooseobj = getCache('SIXTEEN');
    this.setData({
      chooseobj: chooseobj,
    });
  },
  onShow: function() {
    /*  this.setData({
       chooseobj: app.globalData.chooseobj,
     }); */
  },

  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '冠军之路',
      path: 'pages/group/group'
    }
  },
  choseTheWiner: function(event) {
    const flag = event.currentTarget.dataset.flag;
    const index = event.currentTarget.dataset.index;
    const stage = event.currentTarget.dataset.stage;
    let stagearr;
    const stageindex = Math.floor(index / 2);
    const stageitem = (index % 2) + 1;
    let stagedata;
    if (stage < 4) {
      stagearr = 'stage' + (stage + 1);
      stagedata = this.data[ stagearr ];
      stagedata[ stageindex ][ stageitem ] = flag;
    } else if (stage > 5) {
      stagearr = 'stage' + (stage - 1);
      stagedata = this.data[ stagearr ];
      stagedata[ stageindex ][ stageitem ] = flag;
    }

    switch (stage) {
      case 1:
        this.setData({
          stage2: stagedata
        });
        break;
      case 2:
        this.setData({
          stage3: stagedata
        });
        break;
      case 3:
        this.setData({
          stage4: stagedata
        });
        break;
      case 8:
        this.setData({
          stage7: stagedata
        });
        break;
      case 7:
        this.setData({
          stage6: stagedata
        });
        break;
      case 6:
        this.setData({
          stage5: stagedata
        });
        break;
      case 4:
        this.setData({
          champion: this.data.stage4[ 0 ][ '1' ]
        });
        break;
      case 5:
        this.setData({
          champion: this.data.stage5[ 0 ][ '1' ]
        });
        break;
      default:
        break;
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
  }
})
