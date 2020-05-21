// pages/hot-search/hot-search.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  keyword:"冈仁波齐",
	hotSearchArray:[],
	mySearchHistory:[]
  },
  onSearch:function(e){
	  
  },
  onCancel:function(e){
	  wx.navigateBack()
	  // wx.navigateTo({
	  //   url: '../catagory-detail/catagory-detail?id='+id+'&cateName='+catename
	  // })
  },
  /**
   * @description  跳e转到书籍分类选择；
   * */
  handleChooseCatagory(e){
	  wx.navigateTo({
	    url: '../choose-catagory/choose-catagory'
	  })
  },
  /**
   * @description: 获取热门搜索历史
   * */
  getHotSearch(){
	
	let that=this;
	let reqData={}
	api._fetch({
	    url: '/api/search/hot',
	    data:reqData,
	    method:'get',
		 contentType:1
	}).then(function (res) {
		 console.log(res);
		 let hotSearchArray=res.data;
		 that.setData({
			 hotSearchArray
		 });
	    
	}).catch(function (error) {
	    console.log(error);
	});
  },
  /**
   * @description:获取我的搜索历史
   * */
  getMySearchHistory(){
	  
	let that=this;
	let reqData={
		page:0,
		size:10
	}
	api._fetch({
	    url: '/api/i/search/history',
	    data:reqData,
	    method:'get',
		 contentType:1
	}).then(function (res) {
		 console.log(res);
		 let mySearchHistory=res.data.content;
		 that.setData({
			 hotSearchArray
		 });
	    
	}).catch(function (error) {
	    console.log(error);
	});
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getHotSearch();
	this.getMySearchHistory();
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