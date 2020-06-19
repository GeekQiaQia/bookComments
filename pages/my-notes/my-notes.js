// pages/my-notes/my-notes.js
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
	  modalName:null,
	  deleteId:null,
	  confirmDelete:false,
	  notesInfo:{},
	  notesList:{}
  },
  
  /**
   * @description；获取笔记本列表
   * 
   * */
  
   getNotebookList:function(){
	   let reqData={
		   page:0,
		   size:10
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
	   	// 			let notesInfo=that.data.notesInfo;
					// notesInfo.notebooks=res.data;
					// notesInfo.notebookNum=res.data.length;
					// that.setData({
					// 	notesInfo
					// });
					let notesInfo=res.data;
					that.setData({
						notesInfo
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
   handleShowModal(e){
	  let deleteId=e.target.dataset.id;
	  let target=e.target.dataset.target;
   	this.setData({
   		modalName:target,
   		deleteId
   	});
   },
   hideModal(e) {
       this.setData({
         modalName: null,
   	   confirmDelete: false
       })
     },
  /**
     * @description 确认删除评论
     *  
     * */
  confirmDelete(){
  	this.setData({
  	  confirmDelete: true
  	})
  	
  },
  /**
   * @description 确认删除评论；
   *  
   * */
  toDeleteConfirm(){
  	console.log("to delete comment");
  	this.setData({
  	  modalName: null,
  	   confirmDelete: false
  	})
  	let deleteId=this.data.deleteId;
  	this.deleteNoteList(deleteId);
  },
  /**
   * @description  删除笔记列表
   * */
   deleteNoteList(id){
  	 let that=this;
  	let reqData={
  			  id
  	}
  	api._fetch({
  	    url: '/api/i/note/delete',
  	    data:reqData,
  	    method:'get',
  		contentType: 1
  	}).then(function (res) {
  	   wx.showToast({
  	     title: "删除成功",
  	     mask:true,
  	     icon: 'success',
  	     duration: 3000
  	   })
  	   let page=that.data.currentPage;
  	    let pageSize=that.data.pageSize;
  	   that.handleGetNoteList(page,pageSize);
  	}).catch(function (error) {
  	    console.log(error);
  	});
   },
   handleNoteDetail:function(e){
	   let noteId=e.target.dataset.id;
	   wx.navigateTo({
	     url: '../note-detail/note-detail?noteId='+noteId
	   })
   },
   handleBookDetail:function(e){
		let id=e.target.dataset.id;
		let itemIndex=e.target.dataset.itemindex;
		wx.navigateTo({
		  url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemIndex+'&id='+id
		})
   	 
   },
  /**
   * @description 跳转到查看笔记本
   * */
   handleReviewNotebooks:function(e){
	   wx.navigateTo({
	     url: '../my-notebooks/my-notebooks'
	   })
   },
   /**
	* @description 获取笔记列表；
	* */
	handleGetNoteList:function(page=0,size=10){
		let reqData={
				   page,
				   size
		}
		let that=this;
		api._fetch({
		    url: '/api/i/note/list',
		    data:reqData,
		    method:'get',
			contentType:1
		}).then(function (res) {
		
					 // 此处发送修改交易；
					 if(res.statusCode===200){
						 
						 let notesList=res.data;
						 let totalPages=res.data.totalPages;
						 let totalElements=res.data.totalElements;
						 that.setData({
						 	notesList,
						 	totalElements,
						 	totalPages
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
   * @description 跳转到新建笔记本
   * */
   handleNewNotebook:function(e){
	wx.navigateTo({
	  url: '../new-notebook/new-notebook'
	})
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getNotebookList();
	this.handleGetNoteList();
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
 onReachBottom: function() {
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
 		this.handleGetNoteList(page,pageSize);
 	}
 	
 
 },

  /**
   * 用户点击右上角分享
   */
  onShareAppnotes: function () {

  }
})