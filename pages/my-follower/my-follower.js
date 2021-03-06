// pages/my-follower/my-follower.js

const api = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
	follower:{
			num:4,
			
			list:[]
		}
  },
  
  
  /**
    * @description；去关注
    * */
   handleToFocus:function(e){
  	  let that=this;
  	  let user=e.target.dataset.id;
  	  let reqData = {
  	  		user
  	  	}
  	  	api._fetch({
  	  		url: '/api/i/userRelationship/focus',
  	  		data: reqData,
  	  		method: 'post',
  	  		contentType: 1
  	  	})
  	  	.then(function(res) {
  	  	
  	  		// 此处发送修改交易；
  	  		if (res.statusCode === 200) {
  	  			wx.showToast({
  	  			  title: "关注成功",
  	  			  mask:false,
  	  			  icon: 'success',
  	  			  duration: 3000
  	  			})
  	  			that.getUserRelationshipList();
  	  		} else {
  	  			wx.showToast({
  	  				title: res.message,
  	  				mask: true,
  	  				icon: 'none',
  	  				duration: 3000
  	  			})
  	  		}
  	  		
  	  
  	  
  	  })
  	  .catch(function(error) {
  	  	console.log(error);
  	  });
   },
 /**
   * @description；取消关注
   * */
  handleCancelFocus:function(e){
	  
	  let user=e.target.dataset.id;
	  let reqData = {
	  		user
	  	};
		let that=this;
	  	api._fetch({
	  		url: '/api/i/userRelationship/cancel.focus',
	  		data: reqData,
	  		method: 'post',
	  		contentType: 1
	  	})
	  	.then(function(res) {
	  	
	  		// 此处发送修改交易；
	  		if (res.statusCode === 200) {
	  		
	  			that.getUserRelationshipList();
	  		} else {
	  			wx.showToast({
	  				title: res.message,
	  				mask: true,
	  				icon: 'none',
	  				duration: 3000
	  			})
	  		}
	  		
	  
	  
	  })
	  .catch(function(error) {
	  	console.log(error);
	  });
  },

	/**
	 * @description；获取关注我的人
	 * 
	 * */

	getUserRelationshipList: function(id) {
		let reqData = {
			page:0,
			size:10
		},
		that = this;
		api._fetch({
			url: '/api/i/userRelationship/fans.list',
			data: reqData,
			method: 'get',
			contentType: 1
		}).then(function(res) {

			// 此处发送修改交易；
			if (res.statusCode === 200) {
				let  follower=res.data;
					that.setData({
						follower
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getUserRelationshipList();
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