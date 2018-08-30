// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mode = options.mode
    this.setData({
      mode: mode
    })
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.mode
    })
  }

})