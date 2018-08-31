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


  onLoad: function (options) {
    const movieId = options.movieId
    const url = app.globalData.g_doubanBase + "/v2/movie/subject/" + movieId

    this._getMovieDetailInfo(url)
  },

  // 发起请求
  _getMovieDetailInfo(url){
    fly.get(url)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=> {
        console.log(err)
      });
  }


})