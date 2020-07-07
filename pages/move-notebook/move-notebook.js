// pages/move-notebook/move-notebook.js
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
	noteBookRadio:null,
	noteId:null
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
	* @description  选择笔记本
	* */
   handleNotebookSelected(e){
   	
   	  this.setData({
   	       noteBookRadio: e.target.dataset.id,
   	     });
   },
  /**
   * @description: 返回读书笔记
   * */
  handleGoBack:function(e){
   this.handleMoveNotes();										
  	
   },
   
   handleMoveNotes:function(){
	   let notebookId=this.data.noteBookRadio;
	   let noteId=this.data.noteId;
	   let reqData={
	      		   noteId,
	      		   notebookId
	   }
	   let that=this;
	   api._fetch({
	       url: '/api/i/note/move',
	       data:reqData,
	       method:'post',
	   	contentType:1
	   }).then(function (res) {
	   
	   			 // 此处发送修改交易；
	   			 if(res.statusCode===200){
					wx.navigateBack()
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let noteId=options.noteId;
	  this.setData({
		  noteId
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