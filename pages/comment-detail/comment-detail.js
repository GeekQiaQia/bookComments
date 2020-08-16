// pages/comment-detail/comment-detail.js
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
		item:{},
		placeholder:"回复夏之风，留言将由该评论作者筛选展示，对所有人可见",
		focus:true,
		id:"",
		itemindex:"",
		modalName:"",
		bookTitle:"",
		messages:"",
		messagesLen:0,
		keyBoardHeight:"0rpx",
		successInfo:{},
		posterConfig: {
			    width: 750,
			    height: 982,
			    backgroundColor: '#fff',
			    debug: false,
			    pixelRatio: 1,
			    blocks: [
			        {
			            width: 448,
			            height: 736,
			            x: 152,
			            y: 64,
			            borderWidth: 2,
			            borderColor: '#595959',
			            borderRadius: 20,
			        },
			        {
			            width: 634,
			            height: 74,
			            x: 59,
			            y: 770,
			            backgroundColor: '#fff',
			            opacity: 0.5,
			            zIndex: 100,
			        },
			    ],
			    texts: [
			        {
			            x: 162,
			            y:112,
			            baseLine: 'middle',
			            text: "「米读书评",
			            fontSize: 34,
			            color: '#F7F7F7',
			        },
			        {
			            x: 344,
			            y: 118,
			            baseLine: 'middle',
			            text: "随笔",
			            fontSize: 24,
			            color: '#ffffff',
			        },
					{
					    x: 184,
					    y: 180,
					    baseLine: 'middle',
					    text: "",
					    fontSize: 28,
					    color: '#ffffff',
					},
					{
					    x: 184,
					    y: 216,
					    baseLine: 'middle',
					    text: "",
					    fontSize: 20,
					    color: '#eeeeee',
					},
					
			        {
			            x: 184,
			            y: 288,
			            fontSize: 24,
			            baseLine: 'middle',
			            text: "",
			            width: 382,
			            lineNum: 8,
						fontWeight:400,
						lineHeight:36,
			            color: '#666666',
			            zIndex: 200,
			        },
			        {
			            x: 380,
			            y: 606,
			            baseLine: 'middle',
			            text: [
			                {
			                    text: '—— ',
			                    fontSize: 24,
			                    color: '#666666',
			                },
			                {
			                    text: '',
			                    fontSize: 24,
								width: 100,
			                    color: '#666666',
			                    marginRight: 32,
								marginLeft: 2,
			                }
			            ]
			        },
			        {
			            x: 344,
			            y: 686,
			            baseLine: 'middle',
			            text: '长按小程序查看详情',
						fontWeight:400,
						lineHeight:34,
			            fontSize: 24,
			            color: '#969696',
			        },
					{
					    x: 344,
					    y: 720,
					    baseLine: 'middle',
					    text: '分享自',
						fontWeight:400,
						lineHeight:34,
					    fontSize: 24,
					    color: '#969696',
					},
					{
					    x: 416,
					    y: 720,
					    baseLine: 'middle',
					    text: '「米读书评」',
						fontWeight:"bold",
						lineHeight:34,
					    fontSize: 24,
					    color: '#666666',
					},
			     
			    ],
			    images: [
			        {
			            width: 448,
			            height: 192,
			            x: 152,
			            y: 64,
			            borderRadius: 20,
			            url: "../../images/bookbg.png",
			        },
					{
					    width:96,
					    height: 96,
					    x: 232,
					    y: 658,
					    borderRadius: 20,
					    url: "../../images/qrcode.png",
					},
			   
			    ]
			
			},
		replyList:[]
		
  },
  onPosterSuccess(e) {
         const { detail } = e;
         wx.previewImage({
             current: detail,
             urls: [detail]
         })
     },
     onPosterFail(err) {
         console.error(err);
     },
  handleCloseDialog(e){
  	  // let modalName=e.detail.modalName;
  	  this.setData({
  	    modalName:null
  	  })
  },
  handleInputBlur(e){
	  this.setData({
	  	keyBoardHeight:"0rpx"
	  });
  },
  preventTouchMove(){
	  
  },
  toShowShareDialog(e){
  	 console.log(e);
	 let hasAuthed=wx.getStorageSync('hasAuthed');
	 if(!hasAuthed){
	 	// 提示需要获取权限设置；
	 	wx.showModal({
	 		title:'提示：您尚未授权',
	 		confirmText:'授权登录',
	 		showCancel:true,
	 		content:'授权后，您将获得更多精彩功能',
	 		success:function(res){
	 			console.log(res);
	 			if(res.cancel){
	 				wx.setStorageSync('hasAuthed',false )
	 				return;
	 			}else if(res.confirm){
	 				wx.switchTab({
	 				  url: '../aboutMe/aboutMe'
	 				})
	 			}
	 			
	 		},
	 		fail:function(err){
	 			console.log(err);
	 		}
	 	})
	 }else{
		    let successInfo={},
		 	posterConfig=this.data.posterConfig;
		 	successInfo['title']=e.currentTarget.dataset.title;
		 	successInfo['nickName']=e.currentTarget.dataset.nickname;
		 	successInfo['bookName']=e.currentTarget.dataset.bookname;
		 	successInfo['content']=e.currentTarget.dataset.content;
		 	if(successInfo){
		 		if(successInfo['title']!==null){
		 			posterConfig.texts[2].text=successInfo['title'];
		 		}
		 		posterConfig.texts[3].text="《"+successInfo.bookName+"》"+"的读书笔记";
		 		posterConfig.texts[4].text=successInfo.content;
		 		posterConfig.texts[5].text[1].text=successInfo.nickName;
		 	}
		 this.setData({
		   modalName: e.currentTarget.dataset.target,
		   posterConfig,
		   successInfo
		 })
	 }
 
  },
  handleKeyboardHeight(e){

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
  onHandleLikeTrigger(e){
	  // 自定义组件触发事件时提供的detail对象
	  let hasAuthed=wx.getStorageSync('hasAuthed');
	  if(!hasAuthed){
	  	// 提示需要获取权限设置；
	  	wx.showModal({
	  		title:'提示：您尚未授权',
	  		confirmText:'授权登录',
	  		showCancel:true,
	  		content:'授权后，您将获得更多精彩功能',
	  		success:function(res){
	  			console.log(res);
	  			if(res.cancel){
	  				wx.setStorageSync('hasAuthed',false )
	  				return;
	  			}else if(res.confirm){
	  				wx.switchTab({
	  				  url: '../aboutMe/aboutMe'
	  				})
	  			}
	  			
	  		},
	  		fail:function(err){
	  			console.log(err);
	  		}
	  	})
	  }else{
		  let id=e.target.dataset.id;
		  let liked=e.target.dataset.liked;
		  this.toCreateLikeComment(id,liked);
	  }
	  
	 
	  // 发送一个改变like状态的交易；
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
   
   toCreateLikeReplyComment(reply,liked){
  		  // 如果已经点赞，则执行取消点赞交易
  		  let that=this;
  		  let reqData={
  		  		  reply
  		  }
  		  if(liked){
  				   api._fetch({
  				       url: '/api/i/reply/like/cancel',
  				       data:reqData,
  				       method:'post',
  				   	contentType: 1
  				   }).then(function (res) {
  				    
  						let id=that.data.id;
  				      	that.toGetCommentList(id);
  				   }).catch(function (error) {
  				       console.log(error);
  				   });
  		  }else{
  			  api._fetch({
  			      url: '/api/i/reply/like/create',
  			      data:reqData,
  			      method:'post',
  			  	contentType: 1
  			  }).then(function (res) {
  			   
  					 let id=that.data.id;
  					 that.toGetCommentList(id);
  			  }).catch(function (error) {
  			      console.log(error);
  			  });
  		  }
   },
   
  /**
   * @description: 点赞一个书评
   * */
   
   toCreateLikeComment(comment,liked){
  		  // 如果已经点赞，则执行取消点赞交易
  		  let that=this;
  		  let reqData={
  		  		  comment
  		  }
  		  if(liked){
  				   api._fetch({
  				       url: '/api/i/commend/like/cancel',
  				       data:reqData,
  				       method:'post',
  				   	contentType: 1
  				   }).then(function (res) {
  				    
						let id=that.data.itemindex;
  				      	that.getBookCommentDetail(id);
  				   }).catch(function (error) {
  				       console.log(error);
  				   });
  		  }else{
  			  api._fetch({
  			      url: '/api/i/commend/like/create',
  			      data:reqData,
  			      method:'post',
  			  	contentType: 1
  			  }).then(function (res) {
  			   
					 let id=that.data.itemindex;
					 that.getBookCommentDetail(id);
  			  }).catch(function (error) {
  			      console.log(error);
  			  });
  		  }
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
	toShowForwardDialog(e){
		let hasAuthed=wx.getStorageSync('hasAuthed');
		if(!hasAuthed){
			// 提示需要获取权限设置；
			wx.showModal({
				title:'提示：您尚未授权',
				confirmText:'授权登录',
				showCancel:true,
				content:'授权后，您将获得更多精彩功能',
				success:function(res){
					console.log(res);
					if(res.cancel){
						wx.setStorageSync('hasAuthed',false )
						return;
					}else if(res.confirm){
						wx.switchTab({
						  url: '../aboutMe/aboutMe'
						})
					}
					
				},
				fail:function(err){
					console.log(err);
				}
			})
		}else{
			let modalName=e.target.dataset.target;
			this.setData({
					  modalName
			});
		}
		
	},
  showMessageModal(e){
	  let hasAuthed=wx.getStorageSync('hasAuthed');
	  if(!hasAuthed){
	  	// 提示需要获取权限设置；
	  	wx.showModal({
	  		title:'提示：您尚未授权',
	  		confirmText:'授权登录',
	  		showCancel:true,
	  		content:'授权后，您将获得更多精彩功能',
	  		success:function(res){
	  			console.log(res);
	  			if(res.cancel){
	  				wx.setStorageSync('hasAuthed',false )
	  				return;
	  			}else if(res.confirm){
	  				wx.switchTab({
	  				  url: '../aboutMe/aboutMe'
	  				})
	  			}
	  			
	  		},
	  		fail:function(err){
	  			console.log(err);
	  		}
	  	})
	  	
	  }else{
	  	
	  		let modalName=e.target.dataset.target;
	  		this.setData({
	  				  modalName,
	  				  focus:true
	  		});
	  	
	  	}
		
	
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
   * @description:获取书评评论列表
   * */
  toGetCommentList(comment,page=0,size=10){
	 
	  let reqData={
	    	comment,
			page,
			size
	  }
	  let that=this;
	  api._fetch({
	      url: '/api/reply/list',
	      data:reqData,
	      method:'get',
	     contentType:1
	  }).then(function (res) {
	  	 
	  			 // 此处发送修改交易；
	  			 if(res.statusCode===200){
	  					let replyList=res.data.content;
						let totalPages=res.data.totalPages;
						let totalElements=res.data.totalElements;
						that.setData({
							replyList,
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
   	  
   	   			 // 此处发送修改交易；
   	   			 if(res.statusCode===200){
					that.onClose();
					that.setData({
						messages:"",
						messagesLen:0
					});
					wx.showToast({
					  title: '已提交',
					  mask:false,
					  icon: 'success',
					  duration: 3000
					})
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
	
		   
		let id=options.id;
		let itemindex=options.itemindex;
		
		this.setData({
			id,
			itemindex
		});
		this.getBookCommentDetail(itemindex);
		this.toGetCommentList(itemindex);
		let bookTitle =wx.getStorageSync("bookTitle")
		wx.setNavigationBarTitle({
		     title: bookTitle+"的评论"
		   })
		this.setData({
			bookTitle
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
	let self = this;
	 
	 // 显示加载图标
	 
	
	let totalElements=this.data.totalElements;
	let page=this.data.currentPage;
	let pageSize=this.data.pageSize;
	let itemindex=this.data.itemindex
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
		this.toGetCommentList(itemindex,paeg,pageSize);
	}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})