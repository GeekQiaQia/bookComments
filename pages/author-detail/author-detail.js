// pages/author-detail/author-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	authorInfo:{

	}
  },
  /**
   * @description  获取作者详情
   * */
   getAuthorDetail:function(id){
	   let that=this;
	   let reqData={
	   		 page:0,
			 size:10,
			 id
	   }
	   api._fetch({
	       url: '/api/author/detail',
	       data:reqData,
	       method:'get',
	   	   contentType:1
	   }).then(function (res) {
		   let authorInfo=res.data;
		   that.setData({
			   authorInfo
		   });
	   		
	       
	   }).catch(function (error) {
	       console.log(error);
	   });
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
	let id=options.id;
	this.getAuthorDetail(id);
	
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