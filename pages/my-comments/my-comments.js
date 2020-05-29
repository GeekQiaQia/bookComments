// pages/my-comments/my-comments.js
const api = require('../../utils/request.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
	
	/**
	 * 
	 * @description 获取我的书评
	 * */
	getCommentList(){
		  let that=this;
		  let reqData={
				page:0,
				size:10
		  }
		  api._fetch({
		      url: '/api/i/comment/list',
		      data:reqData,
		      method:'get',
			  contentType:1
		  }).then(function (res) {
			let commentInfo=res.data;
			that.setData({
				commentInfo
			});
		      
		  }).catch(function (error) {
		      console.log(error);
		  });
	},
	handleLikeEvent:function(e){
		// 自定义组件触发事件时提供的detail对象
		let commentArray=this.data.commentInfo.commentArray;
		let index=e.detail.index;
		 commentArray[index]["liked"]=!commentArray[index]["liked"];
		let commentArrayName="commentInfo.commentArray";
		this.setData({
			[commentArrayName]:commentArray
		});
		// 发送一个改变like状态的交易；
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
	onShareAppMessage: function() {

	}
})
