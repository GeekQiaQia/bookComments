// pages/catagory-detail/catagory-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	keyword:"",
	active:0,
	tabs:[
		{tab:"综合"},
		{tab:"评分最高"},
		{tab:"评论最多"}
	],
  },
	onChange(e) {
	    this.setData({
	      keyword: e.detail
	    });
	  },
	onSearch() {
	    Toast('搜索' + this.data.keyword);
	  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	      let title=options.cateName;
		  let id=options.id;
		 wx.setNavigationBarTitle({
				title
		 })
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