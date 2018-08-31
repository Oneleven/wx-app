var app = getApp()
var util = require('../../utils/utils')
var Fly = require('../../libs/fly.js')
var fly = new Fly

Page({

  data: {
    mode:['正在热映','即将上映','top250'],
    isShowSearchPage: false,
    isFocus: false,
    isShowNoResult: false
  },

  onLoad: function(options) {
    var inTheatersUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3"
    var comingSoonUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.g_doubanBase + "/v2/movie/top250" + "?start=0&count=3"

    this._getDoubanInfo(inTheatersUrl,'inTheaters')
    this._getDoubanInfo(comingSoonUrl,'comingSoon')
    this._getDoubanInfo(top250Url,'top250')
  },

  // //向豆瓣发起请求
  // _getDoubanInfo(url, flag){
  //   var _this = this
  //   wx.request({
  //     url: url,
  //     method: 'GET',
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     success(res) {
  //       _this.processData(res, flag)
  //     }
  //   })
  // },

  // 提取电影相关数据信息
  processData(res, flag) {
    const movieDatass = []
    const datas = res.data.subjects

    if (datas.length === 0) {
      this.setData({
        isShowNoResult: true
      })
    } else {
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
        [flag]: {
          movieDatas: movieDatass
        },
        isShowNoResult: false
      })
    }
    
  },

  // averageScore补零
  _repair (num){
    return num.toString().length === 1 ? num + '.0' : num
  },



  // fly.js请求
  _getDoubanInfo(url, flag) {
    fly.get(url)
      .then((res)=> {
        this.processData(res, flag)
        // console.log(res)
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // 点击更多跳转页面
  onMoreTap (e) {
    const mode = e.currentTarget.dataset.mode
    wx.navigateTo({
      url: './more-movie/more-movie?mode=' + mode,
    })
  },

  // 搜索框聚焦

  onChange (e) {
    var content = e.detail.toString().trim()
    if (content === '') {
      this.setData({
        isShowSearchPage: false,
        isShowNoResult: false
      })
    } else {
      this.setData({
        isShowSearchPage: true,
        content
      })
    }
  },

  // 确定搜索
  confirmSearch (e) {
    var searchUrl = app.globalData.g_doubanBase + "/v2/movie/search?q=" + this.data.content
    this.setData({
      searchResult:{}
    })
    this._getDoubanInfo(searchUrl, 'searchResult')
  },

  //跳转到电影详情
  onMovieDetail (e) {
    const movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: './movie-detail/movie-detail?movieId=' + movieId,
    })
  }
})