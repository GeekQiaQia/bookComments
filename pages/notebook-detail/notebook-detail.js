// pages/notebook-detail/notebook-detail.js
// pages/new-notebook/new-notebook.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  id:null,
	title:"",
	titleLen:0,
	modalName:null,
	description:"",
	descriptionLen:0,
	disabled:true,
	
  },
	
	/**
	 * @description
	 * */
	 handlTitleInput:function(e){
		let len=e.detail.value.length;
		this.setData({
		  titleLen:len,
		   title:e.detail.value
		});
		if(this.data.titleLen>=1){
				  
				  this.setData({
					  
				    disabled:false,
					
				  });
				  
		}else{
				  this.setData({
				  			  
				    disabled:true,
				  			
				  });
		} 
	 },
	 handleDescriptionInput:function(e){
		 let len=e.detail.value.length;
		 this.setData({
		    descriptionLen:len,
		    description:e.detail.value
		 });
	 },
	 
	 handleSave:function(e){
	 	  // 此处发送修改就要；
		  let that=this;
	 	  let titleLen=this.data.titleLen;
	 	  if(titleLen<1){
	 		  
	 	  }else{
	 		  let title=this.data.title;
	 		
		    that.handleUpdateNotebook();
			
	 	  }
	 	
	 },
	 toDeleteConfirm:function(e){
		 
		 let that=this;
		 let id=parseInt(that.data.id);
		 let reqData={
		 	 	 id			
		 }
		 api._fetch({
		     url: '/api/i/notebook/delete',
		     data:reqData,
		     method:'post',
		 	contentType:1
		 }).then(function (res) {
		 	
		 	 			 // 此处发送修改交易；
		 	 			 if(res.statusCode===200){
		 	 				 wx.showToast({
		 	 				   title: '删除成功',
		 	 				   mask:true,
		 	 				   icon: 'success',
		 	 				   duration: 5000
		 	 				 })
		 	 				 wx.navigateBack()
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
	  * @description:隐藏对话框
	  * */
	  hideModal(e) {
	      this.setData({
	        modalName: null,
	  	   confirmDelete: false
	      })
	    },
	 /**
	  * @description:删除笔记本
	  * 
	  * */
	 handleDelete:function(e){
			this.setData({
			  modalName: e.currentTarget.dataset.target
			})
	 },
	 /**
	  * @description:更新笔记本
	  * 
	  * */
	 handleUpdateNotebook:function(){
	 		 let that=this;
	 		 let name=that.data.title;
	 		 let describes=that.data.description;
			 let id=parseInt(that.data.id);
	 		 let reqData={
	 			 id,
				 name,
	 		 	 describes
				 
	 				
	 		 }
	 		 api._fetch({
	 		     url: '/api/i/notebook/create-update',
	 		     data:reqData,
	 		     method:'post',
	 		 	contentType:1
	 		 }).then(function (res) {
	 		 	 
	 			 // 此处发送修改交易；
	 			 if(res.statusCode===200){
	 				 wx.showToast({
	 				   title: '新建成功',
	 				   mask:true,
	 				   icon: 'success',
	 				   duration: 5000
	 				 })
	 				 wx.navigateTo({
	 				   url: '../my-notes/my-notes'
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
	  * @description:查看笔记本详情
	  * 
	  * */
	 handleNotebookDetail:function(){
		 let that=this;
		
		let id=parseInt(that.data.id);
		let reqData={
			 	 id			
		}
		 api._fetch({
		     url: '/api/i/notebook/detail',
		     data:reqData,
		     method:'get',
		 	 contentType:1
		 }).then(function (res) {
		 	 
			 // 此处发送修改交易；
			 if(res.statusCode===200){
				let notebookInfo=res.data;
				let description=notebookInfo.describes;
				let descriptionLen=description.length;
				let title=notebookInfo.name;
				let titleLen=title.length;
				
				that.setData({
					title,
					titleLen,
					description,
					disabled:false,
					descriptionLen
					
				});
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
	
	  let id=options.id;
	  this.setData({
		  id
	  });
	this.handleNotebookDetail();
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