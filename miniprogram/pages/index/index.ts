Page({
  data: {
    videoUrl: '',
    loading: false,
    result: null
  },

  // 拍视频
  recordVideo() {
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 20,
      camera: 'back',
      success: (res) => {
        this.setData({
          videoUrl: res.tempFilePath,
          result: null
        })
      }
    })
  },

  // 上传视频
  uploadVideo() {
    this.setData({ loading: true })

    wx.uploadFile({
      url: 'http://127.0.0.1:8000/analyze', // 本地后端
      filePath: this.data.videoUrl,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data)
        this.setData({
          result: data,
          loading: false
        })
      },
      fail: () => {
        wx.showToast({
          title: '上传失败',
          icon: 'error'
        })
        this.setData({ loading: false })
      }
    })
  }
})
