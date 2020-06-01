// pages/week-activity/week-activity.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	imageSrc:"",
	id:"",
	recommendListInfo:{},

  },

	handleActivityRecommend:function(){
		let id=this.data.id;
		wx.navigateTo({
		  url: '../activity-recommend/activity-recommend?id='+id
		})
	},
	
	
  /**
	   * @description:获取活动推荐
	   * 
	   * */
	  
	  getActivityRecommendList(detail){
	  	  
	  	let that=this;
	  	let reqData={
	  		detail,
	  		page:0,
	  		size:10
	  	}
	  	api._fetch({
	  	    url: '/api/activity/recommend/list',
	  	    data:reqData,
	  	    method:'get',
	  		 contentType:1
	  	}).then(function (res) {
			let recommendListInfo=res.data;
			console.log(recommendListInfo);
			that.setData({
				recommendListInfo
			})
	  	    
	  	}).catch(function (error) {
	  	    console.log(error);
	  	});
	  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let id=options.id;
	  if(id){
		  this.setData({
		  		  id
		  });
		  this.getActivityRecommendList(id);
		  
	  }
	 
	   let imageSrc=wx.getStorageSync('imageSrcs')
	   imageSrc=imageSrc.split(',')[0];
	   this.setData({
		   imageSrc
	   });
	
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