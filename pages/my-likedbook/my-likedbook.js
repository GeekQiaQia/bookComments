// pages/my-likedbook/my-likedbook.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		likedInfo:{
			
		},
		currentPage:0,
		totalPages:0,
		totalElements:0,
		pageSize:10,
  },
  
  /**
   * @description:处理进入书评详情；
   * 
   * */
  handleCommentDetail:function(e){
  	
  	  // 组件传参过来的id;
  	  let id=e.detail.id;
  	  let itemindex=e.detail.itemIndex;
  	  
  
  	  wx.navigateTo({
  	    url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemindex+'&id='+id
  	  })
  },
  /**
   * 
   * @description 获取我的书评
   * */
  getLikedInfoList(page=0,pageSize=10){
  	  let that=this;
  	 
  	  let reqData={
  			page,
  			size:pageSize
  	  }
  	  api._fetch({
  	      url: '/api/i/commend/like/list.comment',
  	      data:reqData,
  	      method:'get',
  		  contentType:1
  	  }).then(function (res) {
  		let likedInfo=res.data;
  		let totalPages=res.data.totalPages;
  		let totalElements=res.data.totalElements;
  		that.setData({
  			likedInfo,
  			totalElements,
  			totalPages
  		});
  		wx.hideLoading();
  	  }).catch(function (error) {
  	      console.log(error);
  	  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	this.getLikedInfoList();
	
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