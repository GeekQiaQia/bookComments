// pages/score-detail/score-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  scrollHeight:"",
  bookInfo:{},
  commentsList:[  ]
  },
  handleOnFocus(e){
  	
  		 let bookInfo=this.data.bookInfo;
  		 wx.navigateTo({
  			 url: '../post-comment/post-comment'
  		 })
  		 wx.setStorageSync("postBookInfo",bookInfo)
  },
  
  
  /**
   * @description；获取书评详情
   * 
   * */
  
   getBooktags:function(id){
  	   let reqData={
  		   book:id
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/category/tags',
  	       data:reqData,
  	       method:'get',
  	   	contentType:1
  	   }).then(function (res) {
  	   	
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
					 
					 let comment =res.data;
					 
					 that.setData({
					   	commentsList:comment
					 });
  	   			  
  				
  	   			 }else{
  	   				 wx.showToast({
  	   				   title: res.message,
  	   				   mask:false,
  	   				   icon: 'none',
  	   				   duration: 3000
  	   				 })
  	   			 }
  	   			
  	       
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   },
   
  /**
   * @description；获取书评详情
   * 
   * */
  
   getBookCommentDetail:function(id){
  	   let reqData={
  		   id
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/book/detail',
  	       data:reqData,
  	       method:'get',
  	   	contentType:1
  	   }).then(function (res) {
  	   	
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
  	   			  let bookInfo=res.data;
  				  
  				  let author=[];
  				  let translators=[];
  				  let allAuthors=bookInfo.authors;
  				  if(allAuthors!==null){
  					  author=allAuthors.filter(item=>{
  						  return item.translator==false;
  					  });
  					  translators=allAuthors.filter(item=>{
  						  return item.translator==true;
  					  });
  				  }
  				  bookInfo.authors={
  					  author,
  					  translators
  				  }
  				  
  				  that.setData({
  					  bookInfo
  				  });
  	   			 }else{
  	   				 wx.showToast({
  	   				   title: res.message,
  	   				   mask:false,
  	   				   icon: 'none',
  	   				   duration: 3000
  	   				 })
  	   			 }
  	   			
  	       
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   },
   

	/**
	 *动态计算scrollview 高度；
	 *  
	 * 
	*/
	computeScrollViewHeight:function(){
	  // 获取到的单位px;
	  let width=wx.getSystemInfoSync().windowWidth;
	  let height=wx.getSystemInfoSync().windowHeight;
	
	  // rpx与px 之间的换算：750rpx /windowWidth=屏幕高度rpx/windowHeight;
	  let screeHeight=750*height/width;
	
	  // 设置出其余view的高度； swiperHeight=420rpx;tabBarHeight=139rpx
	  let scroll_height=screeHeight-90;
	  
	  this.setData({
	    scrollHeight:scroll_height
	  });
	},
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let title=options.bookName+"的评分"
	  let id=options.id;
	 wx.setNavigationBarTitle({
			title
		  })
		this.getBookCommentDetail(id);
		this.getBooktags(id);
		this.computeScrollViewHeight();	
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