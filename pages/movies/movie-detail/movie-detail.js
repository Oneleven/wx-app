// pages/movies/movie-detail/movie-detail.js
var app = getApp()
var util = require('../../../utils/utils')
var Fly = require('../../../libs/fly.js')
var fly = new Fly

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onLoad: function(options) {
    const movieId = options.movieId
    const url = app.globalData.g_doubanBase + "/v2/movie/subject/" + movieId

    this._getMovieDetailInfo(url)
  },

  // 发起请求
  _getMovieDetailInfo(url) {
    fly.get(url)
      .then((res) => {
        this.processData(res)
        console.log(res)
        console.log(this.data)
      })
      .catch((err) => {
        console.log(err)
      });
  },

  processData(res) {
    const datas = res.data

    const movie = {
      movieImg: datas.images ? datas.images.large : '',
      country: datas.countries[0],
      stars: util.starNumber(datas.rating.stars),
      title: datas.title,
      wishCount: datas.wish_count,
      commentCount: datas.comments_count,
      year: datas.year,
      genres: datas.genres.join("、 "),
      originalTitle: datas.original_title,
      averageScore: this._repair(datas.rating.average),
      summary: datas.summary
    }

    this.setData({
      movie
    })
  },

  // averageScore补零
  _repair(num) {
    return num.toString().length === 1 ? num + '.0' : num
  },


})