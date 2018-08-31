// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/utils')
var Fly = require('../../../libs/fly.js')
var fly = new Fly

Page({

  data: {
    mode: '',
    num: 12,
    isLoading: false
  },

  onLoad: function(options) {
    const mode = options.mode

    const url = {
      正在热映: app.globalData.g_doubanBase + "/v2/movie/in_theaters" + `?start=0&count=12`,
      即将上映: app.globalData.g_doubanBase + "/v2/movie/coming_soon" + `?start=0&count=12`,
      top250: app.globalData.g_doubanBase + "/v2/movie/top250" + `?start=0&count=12`
    }

    this.setData({
      mode
    })
    this._getDoubanInfo(url[mode])
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.mode
    })
  },

  // 获取数据
  processData(res) {
    const movieDatass = []
    const datas = res.data.subjects

    datas.forEach((data) => {
      const temp = {
        stars: util.starNumber(data.rating.stars),
        title: data.title,
        averageScore: this._repair(data.rating.average),
        imgUrl: data.images.large,
        movieId: data.id
      }
      movieDatass.push(temp)
    })

    this.setData({
      movieDatas: movieDatass,
      isLoading: false
    })
  },

  // averageScore补零
  _repair(num) {
    return num.toString().length === 1 ? num + '.0' : num
  },



  // fly.js请求
  _getDoubanInfo(url) {
    this.setData({
      isLoading: true
    })
    fly.get(url)
      .then((res) => {
        var timeId
        if (timeId) {
          clearTimeout(timeId)
        }
        timeId = setTimeout(() => {
          wx.hideLoading()
          wx.hideNavigationBarLoading()
          this.processData(res)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      });
  },

  //上滑加载
  loadMore() {
    // 提示加载
    wx.showLoading({
      title: 'loading'
    })
    wx.showNavigationBarLoading()

    var num = this.data.num
    num += 12

    this.setData({
      num: num
    })

    var url = {
      正在热映: app.globalData.g_doubanBase + "/v2/movie/in_theaters" + `?start=0&count=` + num,
      即将上映: app.globalData.g_doubanBase + "/v2/movie/coming_soon" + `?start=0&count=` + num,
      top250: app.globalData.g_doubanBase + "/v2/movie/top250" + `?start=0&count=` + num
    }

    if (!this.data.isLoading) {
      this._getDoubanInfo(url[this.data.mode])
    }
  }

})