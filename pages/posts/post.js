Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var content = [{
      name: '司马懿',
      detail: '司马紧闭着双眼，而眼皮跳动不已。辗转无眠的时刻，模糊形象开始涌入头脑：父亲的死、江郡的小女孩、还有一些他无从知晓意义的场景：在非常古老的时期，一些人类和魔种从一座塔的底部被升到顶端，挨着被神的弓箭手处以死刑……那是——？有人告诉他，那些人是魔道家族的祖先。他的眼泪无法遏制',
      img: {
        hero_img: '/images/bac/simayi_bac.jpg',
        head_img: '/images/head/simayi.jpg'
      }
    }, {
      name: '孙策',
      detail: '大船靠岸，江郡欢呼着迎来了他们的新领袖——人称江东小霸王的年轻人。他出身于望族，却与那些奢靡豪族的作派完全不同。今天和流浪汉和渔民们一块比喝酒、明天揍一顿欺负民女的公子哥。还有一次，只是选择了除夕在海上度过，便因为“新年放鞭炮”把豪族运粮的船给炸了。他们害怕他和他的小艇，就像害怕海上的阳光最终穿破了黑暗，到那时，寄居吮血的世界将被摧毁得一干二净。这一天最终到来。',
      img: {
        hero_img: '/images/bac/sunjian_bac.jpg',
        head_img: '/images/head/sunjian.jpg'
      }
    }]
    this.setData(content)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})