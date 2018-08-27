Page({
  skipToPost () {
    wx.navigateTo({
      url:'../posts/post'
    })

    // wx.redirectTo({
    //   url: '../posts/post'
    // })
  },

  onHide () {
    console.log('hide')
  },

  onUnload () {
    console.log('onunload')
  }
})