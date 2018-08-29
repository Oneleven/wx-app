var postData = require('../../data/posts-data.js')

Page({

  onPostTap (e) {
    let postId = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + postId,
    })
  },

  // 单个列表绑定事件

  // onSwiperItemTap (e) {
  //   let swiperId = e.currentTarget.dataset.postid
  //   wx.navigateTo({
  //     url: './post-detail/post-detail?id=' + swiperId,
  //   })
  // },


  // 事件代理
  onSwiperTap (e) {
    let swiperId = e.target.dataset.postid
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + swiperId,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      content: postData.postslist
    })
  }
})