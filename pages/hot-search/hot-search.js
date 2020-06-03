// pages/hot-search/hot-search.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  keyword:"",
	hotSearchArray:[],
	noneResult:false,
	choosedCataId:"",
	choosedCataName:"",
	searchResult:{},
	mySearchHistory:[]
  },
  onSearch:function(e){
	 console.log(e);
	 let that=this;
	 let key=e.detail;
	 this.setData({
		 keyword:key
	 });
	 let reqData={
		 key,
		 page:0,
		 size:10
	 }
	 api._fetch({
	     url: '/api/book/search',
	     data:reqData,
	     method:'get',
	 	 contentType:1
	 }).then(function (res) {
	    let searchResult=res.data;
		that.setData({
			searchResult
		})
	     
	 }).catch(function (error) {
	     console.log(error);
	 });
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
   * @description 监听点击书籍详情事件；
   * */
   onBookDetail:function(e){
  	   // 组件传参过来的id;
  	   let id=e.detail.id;
  	   wx.navigateTo({
  	     url: '../book-detail/book-detail?id='+id
  	   })
  	   
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 
	 
	  let choosedCataId=options.id;
	  let choosedCataName=options.name;
	  let keyword=options.keyword;
	  if(choosedCataId&&choosedCataName&&keyword){
	  		this.setData({
	  				  choosedCataId,
	  				  choosedCataName,
	  				  keyword,
					  noneResult:true
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