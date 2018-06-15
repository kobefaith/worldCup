var sourceType = [ [ 'camera' ], [ 'album' ], [ 'camera', 'album' ] ]
var sizeType = [ [ 'compressed' ], [ 'original' ], [ 'compressed', 'original' ] ]
Page({
  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: [ '拍照', '相册', '拍照或相册' ],

    sizeTypeIndex: 2,
    sizeType: [ '压缩', '原图', '压缩或原图' ],

    countIndex: 8,
    count: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  },
  sourceTypeChange: function(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      sourceType: sourceType[ this.data.sourceTypeIndex ],
      sizeType: sizeType[ this.data.sizeTypeIndex ],
      count: this.data.count[ this.data.countIndex ],
      success: function(res) {
        console.log(res);
        if (res.tempFilePaths.length) {
          res.tempFilePaths.forEach((item) => {
            const ctx = wx.createCanvasContext('firstCanvas');
            ctx.drawImage(item, 0, 0, 500, 700);
            ctx.drawImage("../../image/vivo.jpg", 0, 475, 50, 25);
            ctx.drawImage("../../image/world_cup.jpg", 375, 450, 25, 50);
            ctx.draw(false, () => {
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: 'firstCanvas',
                success: function(res) {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath || '',
                    success: (res) => {
                      console.log('图片保存成功::', res);
                    },
                    fail: (res) => {
                      console.log('图片保存失败::', res);
                    }
                  })
                }
              })
            });
          })
        }
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  onShow() {
    console.log('page show');
  },
  onHide() {
    console.log('page hide');
  }
})
