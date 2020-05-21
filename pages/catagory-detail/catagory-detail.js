// pages/catagory-detail/catagory-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	keyword:"",
	active:0,
	tabs:[
		{tab:"综合",name:"comprehensive"},
		{tab:"评分最高",name:"score"},
		{tab:"评论最多",name:"comments"}
	],
	comprehensiveInfo:[],
	scoreInfo:[],
	commentsInfo:[]
  },
	onChange(e) {
	    this.setData({
	      keyword: e.detail
	    });
	  },
	onSearch() {
	    Toast('搜索' + this.data.keyword);
	  },
	  onFocus(e){
	  		  wx.navigateTo({
	  		    url: '../hot-search/hot-search'
	  		  })
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
	   * @description:获取评论最多
	   * 
	   * */
	  
	  getCateogryByComments(category){
	  	  
	  	let that=this;
	  	let reqData={
	  		category,
	  		page:0,
	  		size:10
	  	}
	  	api._fetch({
	  	    url: '/api/search/category/by/comments',
	  	    data:reqData,
	  	    method:'get',
	  		 contentType:1
	  	}).then(function (res) {
	  		
	  	     let commentsInfo=res.data.content;
			 for(let item of commentsInfo){
			 					  let author=[];
			 					  let translators=[];
			 					  let allAuthors=item.authors;
			 					  if(allAuthors!==null){
			 					  					  author=allAuthors.filter(item=>{
			 					  						  return item.translator==false;
			 					  					  });
			 					  					  translators=allAuthors.filter(item=>{
			 					  						  return item.translator==true;
			 					  					  });
			 					  }
			 					  item.authors={
			 					  					  author,
			 					  					  translators
			 					  }
			 }
			 that.setData({
				 commentsInfo
			 });
	  	    
	  	}).catch(function (error) {
	  	    console.log(error);
	  	});
	  },
	  /**
	   * @description:获取评分最高
	   * 
	   * */
	  
	  getCateogryByScore(category){
	  	  
	  	let that=this;
	  	let reqData={
	  		category,
	  		page:0,
	  		size:10
	  	}
	  	api._fetch({
	  	    url: '/api/search/category/by/score',
	  	    data:reqData,
	  	    method:'get',
	  		 contentType:1
	  	}).then(function (res) {
	  		let scoreInfo=res.data.content;
			for(let item of scoreInfo){
								  let author=[];
								  let translators=[];
								  let allAuthors=item.authors;
								  if(allAuthors!==null){
								  					  author=allAuthors.filter(item=>{
								  						  return item.translator==false;
								  					  });
								  					  translators=allAuthors.filter(item=>{
								  						  return item.translator==true;
								  					  });
								  }
								  item.authors={
								  					  author,
								  					  translators
								  }
			}
	  		that.setData({
	  			 scoreInfo
	  		});
	  	
	  	    
	  	}).catch(function (error) {
	  	    console.log(error);
	  	});
	  },
	  /**
	   * @description:获取评分最高
	   * 
	   * */
	  
	  getCateogryByComprehensive(category){
	  	  
	  	let that=this;
	  	let reqData={
	  		category,
	  		page:0,
	  		size:10
	  	}
	  	api._fetch({
	  	    url: '/api/search/category/comprehensive',
	  	    data:reqData,
	  	    method:'get',
	  		 contentType:1
	  	}).then(function (res) {
	  		 let comprehensiveInfo=res.data.content;
			 for(let item of comprehensiveInfo){
			 					  let author=[];
			 					  let translators=[];
			 					  let allAuthors=item.authors;
			 					  if(allAuthors!==null){
			 					  					  author=allAuthors.filter(item=>{
			 					  						  return item.translator==false;
			 					  					  });
			 					  					  translators=allAuthors.filter(item=>{
			 					  						  return item.translator==true;
			 					  					  });
			 					  }
			 					  item.authors={
			 					  					  author,
			 					  					  translators
			 					  }
			 }
	  		 that.setData({
	  		 	 comprehensiveInfo
	  		 });
	  	
	  	    
	  	}).catch(function (error) {
	  	    console.log(error);
	  	});
	  },
	  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	      let title=options.cateName;
		  let id=options.id;
		 wx.setNavigationBarTitle({
				title
		 })
		 this.getCateogryByComments(id);
		 this.getCateogryByScore(id);
		 this.getCateogryByComprehensive(id);
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