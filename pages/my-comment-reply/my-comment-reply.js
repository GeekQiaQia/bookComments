// pages/my-comment-reply/my-comment-reply.js
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
	item:null,
	comment:null,
	commentInfo:null,
	commentList:null,
	replyComment:"",
	placeholder:"",
	modalName:null,
	deleteReplyId:null,
	replyId:null,
	confirmDelete:false,
	showInput:false,
	autofocus:false
  },
  checkMore(e){
	  let itemindex=e.target.dataset.itemindex;
	  wx.navigateTo({
	    url: '../comment-detail/comment-detail?itemindex='+itemindex
	  })
  },
  toDeleteConfirm(){
  	console.log("to delete comment");
  	this.setData({
  	  modalName: null,
  	   confirmDelete: false
  	})
  	let deleteReplyId=this.data.deleteReplyId;
  	this.deleteReply(deleteReplyId);
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
  hideModal(e) {
      this.setData({
        modalName: null,
  	   confirmDelete: false
      })
    },
  handlCommentReplyInput(e){
	  let len=e.detail.value.length;
	  this.setData({
	    
	  		replyComment:e.detail.value
	  });
	 
  },
  handleSendComment(e){
	  let name=e.target.dataset.name;
	  let replyId=e.target.dataset.id;
	  let placeholder="回复"+name+":";
	  console.log(name);
	  this.setData({
		  placeholder,
		  replyId,
		  showInput:true,
		  autofocus:true
		  
	  });
  },
  toHandleAuthorReply(e){
	  let  reply=this.data.replyId;
	  let content=this.data.replyComment;
	  if(content==""){
		 wx.showToast({
		 				title: '回复内容不可为空哦',
		 				mask:true,
		 				icon:'none',
		 				duration: 2000
		 })
	  }else{
		  this.handleAuthorReply(reply,content);  
	  }
	
  },
  /**
   * @description  回复一个评论
   * */
   
   handleAuthorReply(reply,content){
	   let that=this;
	   let reqData={
	   		  reply,
	   		  content
	   };
	   api._fetch({
	       url: '/api/i/reply/author-reply',
	       data:reqData,
	       method:'post',
	   	contentType: 1
	   }).then(function (res) {
		 that.setData({
		 	        replyComment:null,
		 			showInput:false,
		 			autofocus:false,
		 			placeholder:null
		 });
	   	let comment=that.data.comment;
		
	     that.getCommentList(comment);
		
	   }).catch(function (error) {
	       console.log(error);
	   });
   },
  /**
   * @description  作者审核与否
   * */
   
   handleShowComment(e){
   	  let status=e.target.dataset.status;
   	  let reply=e.target.dataset.id;
   	  if(status=='release'){
   		  this.toShowComment(reply,"refuse");
   	  }else{
   		  this.toShowComment(reply,"release");
   	  }
   },
   toShowComment(reply,status){
	   let that=this;
	   let reqData={
	   		  reply,
	   		  status
	   };
	   api._fetch({
	       url: '/api/i/reply/author-check',
	       data:reqData,
	       method:'post',
	   	contentType: 1
	   }).then(function (res) {
	   	let comment=that.data.comment;
	     that.getCommentList(comment);
	   }).catch(function (error) {
	       console.log(error);
	   });
   },
  /**
   * @description  坐着置顶与否
   * 
   * */
  handleUptop(e){
	  let top=e.target.dataset.top;
	  let reply=e.target.dataset.id;
	  if(top==0){
		  this.toTopComment(reply,true);
	  }else{
		  this.toTopComment(reply,false);
	  }
  },
  /**
   * @description  置顶或者取消置顶评论
   * */
  toTopComment(reply,top){
	  
	let that=this;
	let reqData={
			  reply,
			  top
	};
	api._fetch({
	    url: '/api/i/reply/author-top',
	    data:reqData,
	    method:'post',
		contentType: 1
	}).then(function (res) {
		let comment=that.data.comment;
	  that.getCommentList(comment);
	}).catch(function (error) {
	    console.log(error);
	});
  },
  /**
   * @description  获取书评详情
   * */
   getCommentDetail(comment){
  	 let that=this;
  	let reqData={
  			  comment
  	}
  	api._fetch({
  	    url: '/api/book/comment/detail',
  	    data:reqData,
  	    method:'get',
  		contentType: 1
  	}).then(function (res) {
  	   let commentInfo=res.data;
	   that.setData({
		  commentInfo
	   });
  	}).catch(function (error) {
  	    console.log(error);
  	});
   },
   /**
   	* @description  点赞自己的评论
   	* */
   handleLikeReply(e){
	   
	   let reply=e.target.dataset.id;
	   let liked=e.target.dataset.liked;
	   if(!liked){
		   this.handleReplyLikeCreate(reply);
	   }else{
		   this.handleReplyLikeCancel(reply);   
	   }
	   
   },
   handleReplyLikeCreate(reply){
	   let that=this;
	   let reqData={
	   		 reply
	   }
	   api._fetch({
	       url: '/api/i/reply/like/create',
	       data:reqData,
	       method:'post',
	   	contentType: 1
	   }).then(function (res) {
	   let comment=that.data.comment;
	   that.getCommentList(comment);
	      
	   }).catch(function (error) {
	       console.log(error);
	   });
   },
   handleReplyLikeCancel(reply){
	   let that=this;
	   let reqData={
	   		 reply
	   }
	   api._fetch({
	       url: '/api/i/reply/like/cancel',
	       data:reqData,
	       method:'post',
	   	contentType: 1
	   }).then(function (res) {
	   let comment=that.data.comment;
	   that.getCommentList(comment);
	      
	   }).catch(function (error) {
	       console.log(error);
	   });
   },
   
   /**
	* @description  删除自己的评论
	* */
	handleDeleteReply(e){
		let reply=e.target.dataset.id;
		let modalName=e.target.dataset.target;
		this.setData({
			modalName,
			deleteReplyId:reply
		});
		
	},
	deleteReply(reply){
	let that=this;
	let reqData={
			 reply
	}
	api._fetch({
	    url: '/api/i/reply/delete-author-reply',
	    data:reqData,
	    method:'post',
		contentType: 1
	}).then(function (res) {
	let comment=that.data.comment;
	that.getCommentList(comment);
	   
	}).catch(function (error) {
	    console.log(error);
	});	
	},
   /**
    * @description  获取书评详情
    * */
    getCommentList(comment,page=0,size=10){
   	 let that=this;
   	let reqData={
   			  comment,
			  page,
			  size
   	}
   	api._fetch({
   	    url: '/api/i/comment/reply/list',
   	    data:reqData,
   	    method:'get',
   		contentType: 1
   	}).then(function (res) {
   	   let commentList=res.data;
	   let totalPages=res.data.totalPages;
	   let totalElements=res.data.totalElements;
	   that.setData({
	   	commentList,
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
		let id=options.id;
		
		this.getCommentDetail(id);
		this.getCommentList(id);
		let item=wx.getStorageSync('item');
		this.setData({
			item,
			comment:id
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
			let comment=this.data.comment;
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
				this.getCommentList(comment,page,pageSize);
			}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})