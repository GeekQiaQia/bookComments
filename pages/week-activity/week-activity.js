// pages/week-activity/week-activity.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  currentPage:0,
	  totalPages:0,
	  totalElements:0,
	  pageSize:10,
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
	onHandleLikeReplyTrigger(e){
		  // 自定义组件触发事件时提供的detail对象
		  let id=e.target.dataset.id;
		  let liked=e.target.dataset.liked;
		  this.toCreateLikeReplyComment(id,liked);
		  // 发送一个改变like状态的交易；
	},
	/**
	 * @description: 点赞一个书评回复
	 * */
	 
	 toCreateLikeReplyComment(recommend,liked){
			  // 如果已经点赞，则执行取消点赞交易
			  let that=this;
			  let reqData={
			  		  recommend
			  }
			  if(liked){
					   api._fetch({
					       url: '/api/i/activity/recommend/like/cancel',
					       data:reqData,
					       method:'post',
					   	contentType: 1
					   }).then(function (res) {
					    
							let id=that.data.id;
					      	that.getActivityRecommendList(id);
					   }).catch(function (error) {
					       console.log(error);
					   });
			  }else{
				  api._fetch({
				      url: '/api/i/activity/recommend/like/create',
				      data:reqData,
				      method:'post',
				  	contentType: 1
				  }).then(function (res) {
				   
						 let id=that.data.id;
						 that.getActivityRecommendList(id);
				  }).catch(function (error) {
				      console.log(error);
				  });
			  }
	 },
	
	
  /**
	   * @description:获取活动推荐
	   * 
	   * */
	  
	  getActivityRecommendList(detail,page=0,size=10){
	  	  
	  	let that=this;
	  	let reqData={
	  		detail,
	  		page,
	  		size
	  	}
	  	api._fetch({
	  	    url: '/api/activity/recommend/list',
	  	    data:reqData,
	  	    method:'get',
	  		 contentType:1
	  	}).then(function (res) {
			let recommendListInfo=res.data;
			let totalPages=res.data.totalPages;
			let totalElements=res.data.totalElements;
			that.setData({
				recommendListInfo,
				totalPages,
				totalElements
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
			 this.getActivityRecommendList(id,page,pageSize);
			
	 	}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})