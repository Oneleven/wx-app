var postsData = require('../../../data/posts-data.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const globalData = app.globalData
    const postId = options.id
    this.data.currentId = postId
    const postslist = postsData.postslist
    const postData = postslist[postId]
    this.setData(postData)

    // var post_collected = {
    //   1: "true",
    //   2: "false"
    // }

    var postCollected = wx.getStorageSync('post_collected')
    if (postCollected) {
      var collectedOne = postCollected[postId]
      if (collectedOne) {
        this.setData({
          collected:collectedOne
        })
      }
    } else {
      var postCollected = {}
      postCollected[postId] = false
      wx.setStorageSync('post_collected', postCollected)
    }

    // 全局音乐和页面音乐状态同步
    if (globalData.g_isPlayingMusic && globalData.g_currentMusicId === postId) {
      this.setData({
        isPlayingMusic:true
      })
    }

    // 监听音乐状态
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      globalData.g_isPlayingMusic = true
      globalData.g_currentMusicId = this.data.currentId
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      globalData.g_isPlayingMusic = false
      globalData.g_currentMusicId = null
    })
  },

  onCollectionTap(e) {
    var postCollected = wx.getStorageSync('post_collected')
    var collectedOne = postCollected[this.data.currentId]
    collectedOne = !collectedOne
    postCollected[this.data.currentId] = collectedOne

    this._showModal(postCollected, collectedOne)
  },

  _showToast(postCollected, collectedOne) {
    wx.setStorageSync('post_collected', postCollected)
    this.setData({
      collected: collectedOne
    })
    wx.showToast({
      title: collectedOne ? '收藏成功' : '取消收藏'
    })
  },

  _showModal(postCollected, collectedOne) {
    var _this = this
    wx.showModal({
      title: collectedOne ? '是否收藏' : '是否取消收藏',
      content: '啊？',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('post_collected', postCollected)
          _this.setData({
            collected: collectedOne
          })
        }
      }
    })
  },

  // 分享按钮
  onShowTap (e) {
    wx.showActionSheet({
      itemList:[
        '分享给好友',
        '分享到朋友圈',
        '分享到qq',
        '分享到微博'
      ],
      success (res) {
      }
    })
  },

  // 音乐
  onMusicTap () {
    var currentId = this.data.currentId
    var postData = postsData.postslist[currentId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.dataUrl,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }

})