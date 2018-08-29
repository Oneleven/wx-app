Page({
  skipToPost (e) {
    // wx.navigateTo({
    //   url:'../posts/post'
    // })
    wx.switchTab({
      url: '../posts/post',
    })
  }
})