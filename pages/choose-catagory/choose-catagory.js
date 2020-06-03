// pages/choose-catagory/choose-catagory.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	tabs:[],
	 radio: '',
	 keyword:""
  },
    onChange(event) {
		
       this.setData({
         radio: event.detail,
       });
	   
     },
	 onClick(e){
	
		 let name=e.currentTarget.dataset.name;
		 let id=e.currentTarget.dataset.id;
		 let keyword=this.data.keyword;
		 wx.navigateTo({
		   url: '../hot-search/hot-search?id='+id+'&name='+name+'&keyword='+keyword
		 })		
	 },

/**
	 * @description: 获取分类列表；
	 * 
	 * */
	getBannerList(){
		  let that=this;
		  let reqData={
			
		  }
		  api._fetch({
		      url: '/api/category/list',
		      data:reqData,
		      method:'get',
			  contentType:1
		  }).then(function (res) {
			
			 let tabs=res.data;
			 
			 that.setData({
				 tabs
			 });
		      
		  }).catch(function (error) {
		      console.log(error);
		  });
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let keyword=options.keyword
	  this.setData({
		  keyword
	  });
	this.getBannerList();
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