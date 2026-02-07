Page({
  data: {
    videoUrl: '',
    loading: false,
    result: null
  },

  // 拍视频
  recordVideo() {
    wx.chooseVideo({
      sourceType: ['camera', 'album'],
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
      url: 'https://hitright.azurewebsites.net/analyze/serve',
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
