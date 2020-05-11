// pages/top-recommend/top-recommend.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	imageSrc:"",
	bookList:[
		{
			No:1,
			bookInfo:{
				
			}
		},
		{
			No:2,
			bookInfo:{
				
			}
		},
		{
			No:3,
			bookInfo:{
				
			}
		},
		{
			No:4,
			bookInfo:{
				
			}
		},
		{
			No:5,
			bookInfo:{
				
			}
		},
		{
			No:6,
			bookInfo:{
				
			}
		},
		{
			No:7,
			bookInfo:{
				
			}
		},
		{
			No:8,
			bookInfo:{
				
			}
		},
		{
			No:9,
			bookInfo:{
				
			}
		},
		{
			No:10,
			bookInfo:{
				
			}
		}
		
	]
	
  },
  /**
   * @description:top10榜单信息；
   * 
   * */
   getTopRecommendInfo:function(){
	   
	 let that=this;
	 let reqData={
		 page:0,
		 size:10,
	 	type:"TOP100"	
	 }
	 api._fetch({
	     url: '/api/hot/book/list',
	     data:reqData,
	     method:'get',
	 	contentType:1
	 }).then(function (res) {
	 	 console.log(res);
	 			 // 此处发送修改交易；
	 			if(res.statusCode===200){
					
				}else{
	 				 wx.showToast({
	 				   title: res.message,
	 				   mask:true,
	 				   icon: 'none',
	 				   duration: 3000
	 				 })
	 			 }
	 			
	     
	 }).catch(function (error) {
	     console.log(error);
	 });
   },
	/**
	 * @description:获取banner图片；
	 * 
	 * */
  getBannerImage:function(){
	  let that=this;
	  let reqData={
	  		type:"HOTTER"	
	  }
	  api._fetch({
	      url: '/api/banner/details/in',
	      data:reqData,
	      method:'get',
	  	contentType:1
	  }).then(function (res) {
	  	 console.log(res);
	  			 // 此处发送修改交易；
	  			 if(res.statusCode===200){
					 let images=res.data.filter(item=>{
						 return item.url=="Top10";
					 })
					 
	  				let imageSrc=images[0].image;
					that.setData({
						imageSrc
					})
	  			 }else{
	  				 wx.showToast({
	  				   title: res.message,
	  				   mask:true,
	  				   icon: 'none',
	  				   duration: 3000
	  				 })
	  			 }
	  			
	      
	  }).catch(function (error) {
	      console.log(error);
	  });
	  
	 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getBannerImage();
	this.getTopRecommendInfo();
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