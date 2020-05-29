// pages/comment-detail/comment-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		
		item:{},
		placeholder:"回复夏之风，留言将由该评论作者筛选展示，对所有人可见",
		focus:true,
		modalName:"",
		messages:"",
		messagesLen:0,
		keyBoardHeight:"0rpx",
		replyList:[]
		
  },
  handleInputBlur(e){
	  this.setData({
	  	keyBoardHeight:"0rpx"
	  });
  },
  handleKeyboardHeight(e){
	  console.log(e);
	  let {height}=e.detail;
	    
	    height=height+"rpx"
		this.setData({
			keyBoardHeight:height
		});
	  
  },
  handlMessagesInput(e){
	  let len=e.detail.value.length;
	  this.setData({
	    messagesLen:len,
	  	messages:e.detail.value
	  });
  },
   onClose() {
      this.setData({
      		  modalName:null
      });
    },
	hideModal(e) {
		
	    this.onClose();
	   
	  },
	/**
	 * @description:展示转发对话框；
	 * */
	toShowShareDialog(e){
		let modalName=e.target.dataset.target;
		this.setData({
				  modalName
		});
	},
  showMessageModal(e){
	  let modalName=e.target.dataset.target;
	  this.setData({
		  modalName,
		  focus:true
	  });
  },
  /**
   * 转发同时评论
   * */
   toForwardingComment(e){
	   wx.navigateTo({
		   url:'../forward-comment/forward-comment'
	   })
   },
  /**
   * @description: 快速转发
   * 
   * */
	
	toForwardingNow(){
		let comment=this.data.item.id;
		let reqData={
		  	comment
		}
		let that=this;
		api._fetch({
		    url: '/api/i/comment/forwarding-now',
		    data:reqData,
		    method:'post',
		   contentType:1
		}).then(function (res) {
			 console.log(res);
					 // 此处发送修改交易；
					 if(res.statusCode===200){
						// let item=res.data.parent;
						// that.setData({
						// 	item
						// });
						// wx.setStorageSync('item',item)
						 that.onClose();
						 that.getBookCommentDetail(comment);
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
   * @description:获取书评评论列表
   * */
  toGetCommentList(comment){
	 
	  let reqData={
	    	comment,
			page:0,
			size:10
	  }
	  let that=this;
	  api._fetch({
	      url: '/api/reply/list',
	      data:reqData,
	      method:'get',
	     contentType:1
	  }).then(function (res) {
	  	 console.log(res);
	  			 // 此处发送修改交易；
	  			 if(res.statusCode===200){
	  					let replyList=res.data.content;
						that.setData({
							replyList
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
   * @description 获取当前书评详情；
   * @param { comment} id 
   * */
   getBookCommentDetail:function(comment){
  	   let reqData={
  	     	comment
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/book/comment/detail',
  	       data:reqData,
  	       method:'get',
  		   contentType:1
  	   }).then(function (res) {
  	     let item=res.data;
		 let name=item.userInfo.nickName;
		 let placeholder="回复"+name+"，留言将由该评论作者筛选展示，对所有人可见";
  		 that.setData({
  			 item,
			 placeholder
  		 });
		 
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   }, 
   /**
    * @description 创建一个书评的评论
    * @param { content} 书评内容
	 * @params{ comment } 书评ID
    * */
   toCreateCommentPost:function(){
	   let content=this.data.messages;
	   let comment=this.data.item.id;
   	   let reqData={
   	     	comment,
			content
   	   }
   	   let that=this;
   	   api._fetch({
   	       url: '/api/i/reply/create',
   	       data:reqData,
   	       method:'post',
   		   contentType:1
   	   }).then(function (res) {
   	   	 console.log(res);
   	   			 // 此处发送修改交易；
   	   			 if(res.statusCode===200){
					that.onClose();
					that.setData({
						messages:"",
						messagesLen:0
					});
					wx.showToast({
					  title: '已提交',
					  mask:true,
					  icon: 'success',
					  duration: 5000
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
	
		let id=options.id;
		this.setData({
			id
		});
		this.getBookCommentDetail(id);
		this.toGetCommentList(id);
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
	this.setData({
			  modalName:null
	});
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