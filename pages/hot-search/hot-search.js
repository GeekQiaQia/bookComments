// pages/hot-search/hot-search.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  keyword:"",
	hotSearchArray:[],
	choosedCataId:"",
	choosedCataName:"",
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
   * 
   * */
  handleChooseCatagory(e){
	  let that=this;
	  console.log(that.data);
	  let keyword=that.data.keyword;
	  wx.navigateTo({
	    url: '../choose-catagory/choose-catagory?keyword='+keyword
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
			 mySearchHistory
		 });
	    
	}).catch(function (error) {
	    console.log(error);
	});
  },
  /**
   * @description  取消；
   * */
  handleCancel(e){
	 wx.switchTab({
	 		  url: '../hotRecommend/hotRecommend'
	 });
  },
  /**
   * @description  完成
   * */
  handleComplete(e){
	  
	  let bookName=this.data.keyword;
	  this.handleAddBook();
	  wx.navigateTo({
	    url: '../recommend-result/recommend-result?bookName='+bookName
	  })
	  
	  
  },
  handleAddBook(){
	  let that=this;
	  let choosedCataId=that.data.choosedCataId;
	  let name=that.data.keyword;
	  let reqData={
	  	 category :choosedCataId,
	  	 name
	  }
	  api._fetch({
	      url: '/api/i/recommend/book',
	      data:reqData,
	      method:'post',
	  	 contentType:1
	  }).then(function (res) {
	  	
	      
	  }).catch(function (error) {
	      console.log(error);
	  });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.setData({
		  keyword:"冈仁波齐"
	  });
	 
	  let choosedCataId=options.id;
	  let choosedCataName=options.name;
	  let keyword=options.keyword;
	  if(choosedCataId&&choosedCataName&&keyword){
	  		this.setData({
	  				  choosedCataId,
	  				  choosedCataName,
	  				  keyword
	  		});  
	  }
	
	  
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