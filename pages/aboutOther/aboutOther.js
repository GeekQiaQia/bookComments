// pages/aboutOther/aboutOther.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	id:null,
	aboutInfo:null,
	commentsList:{
		totalElements:0
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
	  	  let cardInfoArray=this.data.cardInfoArray;
	  
	  	  wx.navigateTo({
	  	    url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemindex+'&id='+id
	  	  })
	  },
getOtherUserinfo:function(id){
	let that=this,
	reqData={
		id
	};
	api._fetch({
	    url: '/api/other/user.info', 
		data:reqData,
	    method:'get',
		 contentType:1
	}).then(function (res) {
	  let aboutInfo=res.data;
	  wx.setNavigationBarTitle({
		  title:aboutInfo.nickName
	  })
	   that.setData({
		   aboutInfo
	   });
	  
	}).catch(function (error) {
	    console.log(error);
	});
},
getCommentList:function(id,page=0,size=10){
	let that=this,
	reqData={
		id,
		page,
		size
	};
	api._fetch({
	    url: '/api/other/comments', 
		data:reqData,
	    method:'get',
		 contentType:1
	}).then(function (res) {
	  let commentsList=res.data;
	  let totalPages=res.data.totalPages;
	  let totalElements=res.data.totalElements;
	   that.setData({
		   totalElements,
		   totalPages,
		   commentsList
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
	let id=options.id;
	this.setData({
		id
	});
	// 获取他人信息；
	this.getOtherUserinfo(id);
	this.getCommentList(id);
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
	let self = this;
	 
	 // 显示加载图标
	 
	
	let totalElements=this.data.totalElements;
	let page=this.data.currentPage;
	let pageSize=this.data.pageSize;
	let id=this.data.id;
	if(pageSize<totalElements){
		// page++;
		pageSize+=10;
		self.setData({
			currentPage:page,
			pageSize
		});
		wx.showLoading({
			
		  title: '更多加载中',
			
		})
		this.getCommentList(id,page,pageSize);
	}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})