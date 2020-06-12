// pages/my-message/my-message.js

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
	messageInfo:{
		num:3,
		list:[
			{	status:0,
				date:"2020/2/20",
				info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～"
			},
			{
				status:0,
				date:"2020/2/20",
				info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～"
			},
			{	status:1,
				date:"2020/2/20",
				info:"你对书籍《一个人的朝圣》推荐的影片，已被平台收录并整理，前去查看～"
			}
		]
	}
  },
/**
 * @description  获取消息列表
 * */
getMessageList(page=0,pageSize=10){
	let that=this;
	let reqData={
			  page,
			  size:pageSize
	}
	api._fetch({
	    url: '/api/i/message/list',
	    data:reqData,
	    method:'get',
		contentType: 1
	}).then(function (res) {
		let messageInfo=res.data;
		let totalPages=res.data.totalPages;
		let totalElements=res.data.totalElements;
		that.setData({
			messageInfo,
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
	this.getMessageList();
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
 		this.getMessageList(page,pageSize);
 	}
 	
 
 },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})