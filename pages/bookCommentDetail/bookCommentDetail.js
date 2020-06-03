// pages/bookCommentDetail/bookCommentDetail.js
//获取应用实例
const api = require('../../utils/request.js')
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bookInfo: {},
		scrollHeight:"",
		id:null,
		maxStars: 5,
		visible: false,
		userInfo: {},
		cardInfoArray:[],
		commentNum:"",
		item: {},
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		hasUserInfo: false
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
      let scroll_height=screeHeight-166;
      
      this.setData({
        scrollHeight:scroll_height
      });
    },
    
	
	/**
	 * @description；关注或者取消关注
	 * 
	 * */
	
	toFocusOnUsers: function(e) {
		let focusId=e.target.dataset.id
		let reqData = {
			focusId,
			type:1
		}
		let that = this;
		api._fetch({
			url: '/api/i/userRelationship/focus',
			data: reqData,
			method: 'post',
			contentType: 1
		}).then(function(res) {
		
			// 此处发送修改交易；
			if (res.statusCode === 200) {
				wx.showToast({
				  title: "关注成功",
				  mask:true,
				  icon: 'success',
				  duration: 3000
				})
			} else {
				wx.showToast({
					title: res.message,
					mask: true,
					icon: 'none',
					duration: 3000
				})
			}
			
		}).catch(function(error) {
			console.log(error);
		});
	},
	
	/**
	 * @description；获取书评详情
	 * 
	 * */

	getBookDetail: function(id) {
		let reqData = {
			id
		}
		let that = this;
		api._fetch({
			url: '/api/book/detail',
			data: reqData,
			method: 'get',
			contentType: 1
		}).then(function(res) {
		
			// 此处发送修改交易；
			if (res.statusCode === 200) {
				let bookInfo = res.data;
				wx.setNavigationBarTitle({
				     title: bookInfo.name+"的书评"
				   })
				let author = [];
				let translators = [];
				let allAuthors = bookInfo.authors;
				if (allAuthors !== null) {
					author = allAuthors.filter(item => {
						return item.translator == false;
					});
					translators = allAuthors.filter(item => {
						return item.translator == true;
					});
				}
				bookInfo.authors = {
					author,
					translators
				}
				

				that.setData({
					bookInfo
				});
				
			} else {
				wx.showToast({
					title: res.message,
					mask: true,
					icon: 'none',
					duration: 3000
				})
			}
			
		}).catch(function(error) {
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
			 that.setData({
				 item
			 });
		   			
		       
		   }).catch(function (error) {
		       console.log(error);
		   });
	 }, 
	/**
	 * @description 获取书籍评论详情；
	 * @param { bookId} id 
	 * */
	 getBookCommentList:function(book){
		   let reqData={
		     	book,
				page:0,
				size:10
		   }
		   let that=this;
		   api._fetch({
		       url: '/api/book/comment.list',
		       data:reqData,
		       method:'get',
			   contentType:1
		   }).then(function (res) {
		   	
		   			 // 此处发送修改交易；
		   			 if(res.statusCode===200){
						 let commentNum=res.data.totalElements;
		   			let cardInfoArray=res.data.content;
				
					for(let item of cardInfoArray ){
						item['readMore']=false;
					}
					that.setData({
						cardInfoArray,
						commentNum
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
	 
	 handleCategoryDetail(e){
	 		// 组件绑定来的id;
	 		let id=e.target.dataset.id;
	 		let catename=e.target.dataset.catename;
	 		wx.navigateTo({
	 		  url: '../catagory-detail/catagory-detail?id='+id+'&cateName='+catename
	 		})
	 	},
	 handleAuthorDetail(e){
	 	   // 组件绑定来的id;
	 	   let id=e.target.dataset.id;
	 	   wx.navigateTo({
	 	     url: '../author-detail/author-detail?id='+id
	 	   })
	 },
	 handlePressDetail(e){
	 	  // 组件绑定来的id;
	 	    let id=e.target.dataset.id;
	 	   wx.navigateTo({
	 	     url: '../press-detail/press-detail?id='+id
	 	   })
	 },
	 /**
	  * @description 监听点击书籍详情事件；
	  * */
	 handleBookDetail(e){
		// 组件传参过来的id;
		 let id=e.target.dataset.id
		wx.navigateTo({
		  url: '../book-detail/book-detail?id='+id
		})
	 },
	 handleCommentDetail(e){
		 let id=this.data.id;
		 wx.navigateTo({
		   url: '../comment-detail/comment-detail?id='+id
		 })
	 },
		  
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let name = "loginInfo.name"
	
		if (app.globalData.userInfo) {

			this.setData({
				userInfo: app.globalData.userInfo,
				[name]: app.globalData.userInfo.nickName,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					[name]: res.userInfo.nickName,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						[name]: res.userInfo.nickName,
						hasUserInfo: true
					})
				}
			})
		}

		let id = options.id;
		this.setData({
			id
		});
		this.getBookDetail(id);
		this.getBookCommentList(id);
		this.getBookCommentDetail(id);
		this.computeScrollViewHeight();
		
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(ops) {
		if (ops.from === 'button') {
			// 转发事件来源。
			console.log(ops.target);
		}
		return {
			title: '自定义转发标题',
			path: '/index/index?id=123'
		}

	},
	close: function() {
		this.setData({
			visible: false
		})
	}
})
