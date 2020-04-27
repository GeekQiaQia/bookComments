// pages/my-comments/my-comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	commentInfo:{
		bookNum:0,
		likeNum:0,
		commentDetail:
			{
				commentBookList:[
				{
					bookType:"文学",
					bookList:[
						{
							name:"一个人的朝圣",
							status:"已上线",
							statusCode:0,
							onlineTips:"已上线，前往查看吧"
						},
						{
							name:"追风筝的人",
							status:"已上线",
							statusCode:0,
							onlineTips:"已上线，前往查看吧"
						},
					]
				},
				{
					bookType:"历史",
					bookList:[
						{
							name:"冈仁波济",
							status:"待维护",
							statusCode:1,
							onlineTips:"尽力争取资源中…"
						},
						{
							name:"仁波济",
							status:"待维护",
							statusCode:1,
							onlineTips:"尽力争取资源中…"
						},
					]
				}
					
				],
				commentVideoList:[
				{
					videoType:"影片",
					videoList:[
						{
							name:"朝圣之路（The Way）",
							status:"已上线",
							statusCode:0,
							onlineTips:"已上线，前往查看吧"
						},
						{
							name:"Dear Dracula ",
							status:"待维护",
							statusCode:1,
							onlineTips:"尽力争取资源中…"
						},
					]
				},
					
				],
			}
		
	}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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