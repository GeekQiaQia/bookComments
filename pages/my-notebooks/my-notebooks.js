// pages/my-notebooks/my-notebooks.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	notesInfo:{},
	currentPage:0,
	totalPages:0,
	totalElements:0,
	pageSize:10,
  },
  /**
   * @description；获取笔记本列表
   * 
   * */
  
   getNotebookList:function(page=0,size=10){
  	   let reqData={
  		   page,
  		   size
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/i/notebook/list',
  	       data:reqData,
  	       method:'get',
  	   	contentType:1
  	   }).then(function (res) {
  	   
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
  	   
					   let notesInfo=res.data;
					   let totalPages=res.data.totalPages;
					   let totalElements=res.data.totalElements;
					   that.setData({
						notesInfo,
						totalElements,
						totalPages
					   });
					   
					   wx.hideLoading();
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
  * @description 跳转到新建笔记本
  * */
  handleNewNotebook:function(e){
 	wx.navigateTo({
 	  url: '../new-notebook/new-notebook'
 	})
  },

	/**
	 * @description: 返回读书笔记
	 * */
	handleGoBack:function(e){
		wx.navigateBack({
			url: '../my-notes/my-notes'
		})
		
	 },
	 /**
	  * @description:笔记本详情
	  * */
	  handleNotebookDetail:function(e){
		  let id =e.target.dataset.id;
		  if(id!==0){
			  wx.navigateTo({
			    url: '../notebook-detail/notebook-detail?id='+e.target.dataset.id
			  })
		  }
		 
	  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	this.getNotebookList();
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
					this.getNotebookList(page,pageSize);
				}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})