// pages/my-comments/my-comments.js
const api = require('../../utils/request.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		
		deleteId:null,
		commentId:0,
		confirmDelete:false,
		modalName:null,
		currentPage:0,
		totalPages:0,
		totalElements:0,
		pageSize:10,
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
				    text: "他不是心灵鸡汤",
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
		successInfo:{},
		commentInfo: {
			bookNum: 3,
			likeNum: 2,
			commentArray:[
				{
					status: 0,
					iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
					like:542,
					liked:true,
					name: "春天来了",
					date: "2月25日",
					bookComment: "读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重…",
					forward: "689",
					forwarded:false,
					bookUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
					bookName: "一个人的朝圣",
					stars: "5",
					commentsNum: "30258",
				
				},
			{
				status: 0,
				iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				like:542,
				liked:true,
				name: "春天来了",
				date: "2月25日",
				bookComment: "读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重…",
				forward: "689",
				forwarded:true,
				bookUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				bookName: "一个人的朝圣",
				stars: "2",
				commentsNum: "30258",
			
			},
		{
			status: 0,
			iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			like:542,
			liked:false,
			name: "春天来了",
			date: "2月25日",
			bookComment: "读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重…",
			forward: "689",
			forwarded:true,
			bookUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			bookName: "一个人的朝圣",
			stars: "4",
			commentsNum: "30258",
		
		},
		{
			status: 0,
			iconUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			like:542,
			liked:true,
			name: "春天来了",
			date: "2月25日",
			bookComment: "读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重…",
			forward: "689",
			forwarded:false,
			bookUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			bookName: "一个人的朝圣",
			stars: "3",
			commentsNum: "30258",
		
		}
			]
		},
	
	},
	toDeleteConfirm(){
		console.log("to delete comment");
		this.setData({
		  modalName: null,
		   confirmDelete: false
		})
		let deleteId=this.data.deleteId;
		this.deleteCommentReply(deleteId);
	},
	/**
	 * @description  删除回复列表
	 * */
	 deleteCommentReply(reply){
		 let that=this;
		let reqData={
				  reply
		}
		api._fetch({
		    url: '/api/i/reply/delete',
		    data:reqData,
		    method:'post',
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
		   that.getCommentList(page,pageSize);
		}).catch(function (error) {
		    console.log(error);
		});
	 },
	 hideModal(e) {
	     this.setData({
	       modalName: null,
	 	   confirmDelete: false
	     })
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
				    
				      let page=that.data.currentPage;
				       let pageSize=that.data.pageSize;
				      that.getCommentList(page,pageSize);
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
			   
			     let page=that.data.currentPage;
			      let pageSize=that.data.pageSize;
			     that.getCommentList(page,pageSize);
			  }).catch(function (error) {
			      console.log(error);
			  });
		  }
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
	 * 
	 * @description 获取我的书评
	 * */
	getCommentList(page=0,pageSize=10){
		  let that=this;
		 
		  let reqData={
				page,
				size:pageSize
		  }
		  api._fetch({
		      url: '/api/i/comment/list',
		      data:reqData,
		      method:'get',
			  contentType:1
		  }).then(function (res) {
			let commentInfo=res.data;
			let totalPages=res.data.totalPages;
			let totalElements=res.data.totalElements;
			that.setData({
				commentInfo,
				totalElements,
				totalPages
			});
			wx.hideLoading();
		  }).catch(function (error) {
		      console.log(error);
		  });
	},
	handleShowModal(e){
		let deleteId=e.detail.id;
		let target=e.detail.target;
		this.setData({
			modalName:target,
			deleteId
		});
	},
	handleCloseDialog(e){
		  
		  this.setData({
		    modalName:null
		  })
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
	handleShareEvent:function(e){
		console.log("e is "+e);
		let successInfo={},
			posterConfig=this.data.posterConfig;
			successInfo['nickName']=e.detail.nickName;
			successInfo['bookName']=e.detail.bookName;
			successInfo['content']=e.detail.content;
			if(successInfo){
				posterConfig.texts[3].text="《"+successInfo.bookName+"》"+"的读书笔记";
				posterConfig.texts[4].text=successInfo.content;
				posterConfig.texts[5].text[1].text=successInfo.nickName;
			}
			//successInfo=JSON.stringify(successInfo);
			console.log(successInfo);
		this.setData({
		  modalName: e.detail.target,
		  posterConfig,
		  successInfo
		})
	},
	/**
	 * 转发同时评论
	 * */
	 toForwardingComment(e){
		   wx.navigateTo({
			   url:'../forward-comment/forward-comment?type=mycomment'
		   })
	 },
	 onClose() {
	    this.setData({
	    		  modalName:null
	    });
	  },
	/**
	 * @description: 快速转发
	 * 
	 * */
		toForwardingNow(){
			let comment=this.data.commentId;
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
					
							that.getCommentList();
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
		
	handleForwardEvent:function(e){
		console.log(e);
		let commentId=e.detail.id,
			item=e.detail.item;
			console.log(item);
		wx.setStorageSync("item",item)
		this.setData({
		  modalName: e.detail.target,
		  commentId
		})
	},
	handleLikeEvent:function(e){
		// 自定义组件触发事件时提供的detail对象
		let id=e.detail.id;
		let liked=e.detail.liked
		this.toCreateLikeComment(id,liked);
		// 发送一个改变like状态的交易；
	},
	handleMyLikedbook:function(e){
		wx.navigateTo({
			 url: '../my-likedbook/my-likedbook',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
	
		this.getCommentList();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.onClose();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

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
			this.getCommentList(page,pageSize);
		}
		
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
