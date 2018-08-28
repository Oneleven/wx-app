var postsData = require('../../../data/posts-data.js')

Page({

  onCollectionTap (e) {
    var postCollected = wx.getStorageSync('post_collected')
    var collected = postCollected[this.data.currentId]
    this.collected = !collected
    console.log(this.collected)
    postCollected[this.data.currentId] = this.collected
  },

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.id
    this.data.currentId = postId
    const postslist = postsData.postslist
    const postData = postslist[postId]
    this.setData(postData)

    var postCollected = wx.getStorageSync('post_collected')
    if (postCollected) {
      var collected = postCollected[postId]
      if (collected) {
        this.setData({
          collected:collected
        })
      }
    } else {
      var postCollected = {}
      postCollected[postId] = false
      wx.setStorageSync('post_collected', postCollected)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})