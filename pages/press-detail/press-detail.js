// pages/press-detail/press-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	pressInfo:{
		
	}
  },
  /**
   * @description  获取作者详情
   * */
   getPressDetail:function(id){
  	   let that=this;
  	   let reqData={
  	   		 page:0,
  			 size:10,
  			 id
  	   }
  	   api._fetch({
  	       url: '/api/press/detail',
  	       data:reqData,
  	       method:'get',
  	   	   contentType:1
  	   }).then(function (res) {
  		   let pressInfo=res.data;
  		   that.setData({
  			   pressInfo
  		   });
  	   		
  	       
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//路由传参出版社id;
	let id=options.id;
	this.getPressDetail(id);
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