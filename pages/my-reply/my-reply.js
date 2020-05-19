// pages/my-reply/my-reply.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		replyInfo:{
				num:6,
				list:[
					{	status:0,
						date:"2020/2/20",
						info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～",
						iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						name:"春天来了",
						date:"2月25日",
						myReplyInfo:"虽然是十年前的文章，但有很多表达用语现在看来仍不过时，牛逼",
						reverseName:"刘十三",
						reverseReply:"其实人就是这样",
						bookComment:"很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对事物的发…",
						userful:"689",
						transmit:"22",
						bookUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						bookName:"一个人的朝圣",
						stars:"5",
						commentsNum:"30258",
						top:1
					},
					{
						status:0,
						date:"2020/2/20",
						info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～",
						iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						name:"春天来了2",
						date:"2月25日",
						myReplyInfo:"虽然是十年前的文章，但有很多表达用语现在看来仍不过时，牛逼",
						reverseName:"刘十三",
						reverseReply:"其实人就是这样",
						bookComment:"很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对事物的发…",
						userful:"1689",
						transmit:"23",
						bookUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						bookName:"一个人的朝圣",
						stars:"4",
						commentsNum:"30258",
						top:0
						
					},
					{	status:1,
						date:"2020/2/20",
						info:"你对书籍《一个人的朝圣》推荐的影片，已被平台收录并整理，前去查看～",
						iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						name:"春天来了3",
						date:"2月25日",
						myReplyInfo:"虽然是十年前的文章，但有很多表达用语现在看来仍不过时，牛逼",
						reverseName:"刘十三",
						reverseReply:"其实人就是这样",
						bookComment:"很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对事物的发…",
						userful:"680",
						transmit:"24",
						bookUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
						bookName:"一个人的朝圣",
						stars:"3",
						commentsNum:"30258",
						top:0
					}
				]
			},
			modalName:"",
			confirmDelete:false
  },
  
  showModal(e) {
	  
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
	
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
toDeleteConfirm(){
	console.log("to delete comment");
	this.setData({
	  modalName: null,
	   confirmDelete: false
	})
	this.deleteCommentReply();
},
toShowShareDialog(e){
	
	this.setData({
	  modalName: e.currentTarget.dataset.target
	})
},
imageLoad(e){
	
},
imageError(e){
	
},
handleColseShareDialog(){
	this.setData({
	  modalName: null,
	  
	})
},
/**
 * @description  获取回复列表
 * */
getReplyList(){
	let that=this;
	let reqData={
			  page:0,
			  size:10
	}
	api._fetch({
	    url: '/api/i/commentReply/list',
	    data:reqData,
	    method:'get'
	}).then(function (res) {
		let replyInfo=res.data;
		console.log(replyInfo);
	    that.setData({
			replyInfo
		})
	}).catch(function (error) {
	    console.log(error);
	});
},
/**
 * @description  获取回复列表
 * */
 deleteCommentReply(){
	let reqData={
			  id:0
	}
	api._fetch({
	    url: '/api/i/commentReply/delete',
	    data:JSON.stringify(reqData),
	    method:'post'
	}).then(function (res) {
	    console.info(res)
	}).catch(function (error) {
	    console.log(error);
	});
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 wx.showShareMenu({
		  // 要求小程序返回分享目标信息
		  withShareTicket: true
		}); 
		this.getReplyList();
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
  onShareAppMessage: function (ops) {
	  let that=this;
	 if (ops.from === 'button') {
	      // 来自页面内转发按钮
	      console.log(ops.target)
	    }
		this.setData({
		  modalName: null,
		  
		})
	    return {
	      title: '我的回复',
	      path: `pages/my-reply/my-reply`,
	    }
		
		
  }
})