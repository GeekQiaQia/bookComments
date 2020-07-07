// pages/activity-recommend/activity-recommend.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	imageSrc:"",
	descriptInput:'',
	recommendBookName:"",
	descriptInputLen:0,
	id:""
  },
  recommendBookInput:function(e){
	  let len=e.detail.value.length;
	  this.setData({
	  		recommendBookName:e.detail.value
	  });
  },
  textareaAInput:function(e){
	  let len=e.detail.value.length;
	  this.setData({
	    descriptInputLen:len,
		descriptInput:e.detail.value
	  });
  },

  
  handleActivityRecommend(){
	  
	  let book=this.data.recommendBookName;
	  let reason=this.data.descriptInput;
	  let id=this.data.id;
	  let reqData={
		  activity:id,
		  book,
		  reason
	  }
	api._fetch({
	    url: '/api/i/activity/recommend',
	    data:reqData,
	    method:'post',
		contentType:1
	}).then(function (res) {
	
		wx.showToast({
		  title: '推荐成功',
		  mask:false,
		  icon: 'success',
		  duration: 5000
		})
		wx.redirectTo({
			 url: '../week-activity/week-activity?id='+id,
		})
	}).catch(function (error) {
	    console.log(error);
	});  
  },

  handleSave:function(){
	// wx.showLoading({
	//   title: '加载中',
	// })  
	// setTimeout(function () {
	//   wx.hideLoading()
	// }, 10000)
	wx.showToast({
	  title: '已发送',
	  mask:false,
	  icon: 'success',
	  duration: 5000
	})
	this.handleActivityRecommend();
	
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let id=options.id;
	this.setData({
		id
	});
	let imageSrc=wx.getStorageSync('imageSrcs')
	imageSrc=imageSrc.split(',')[1];
	this.setData({
			   imageSrc
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