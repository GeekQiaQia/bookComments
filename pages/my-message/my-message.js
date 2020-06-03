// pages/my-message/my-message.js

const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
getMessageList(){
	let that=this;
	let reqData={
			  page:0,
			  size:10
	}
	api._fetch({
	    url: '/api/i/message/list',
	    data:reqData,
	    method:'get',
		contentType: 1
	}).then(function (res) {
		let messageInfo=res.data;
	    that.setData({
			messageInfo
		})
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})