// pages/hotRecommend/hotRecommend.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	keyword:"",
	categoryBookInfo:[],
	active:0,
	tabs:[
		
	],
	hotBook:{
		type:"文学",
		num:1006,
		list:[
			{	status:0,
				date:"2020/2/20",
				info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～",
				iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				name:"春天来了",
				notice:"读过",
				forward:"9",
				reply:"10",
				like:"10058",
				date:"2月25日",
				myReplyInfo:"虽然是十年前的文章，但有很多表达用语现在看来仍不过时，牛逼",
				reverseName:"刘十三",
				reverseReply:"其实人就是这样",
				bookComment:"很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对事物的发…",
				userful:"689",
				transmit:"22",
				bookUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				bookName:"一个人的朝圣",
				stars:"5",
				commentsNum:"30258",
				top:1
			},
			{	status:0,
				date:"2020/2/20",
				info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～",
				iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				name:"春天来了",
				notice:"读过",
				forward:"9",
				reply:"10",
				like:"10058",
				date:"2月25日",
				myReplyInfo:"虽然是十年前的文章，但有很多表达用语现在看来仍不过时，牛逼",
				reverseName:"刘十三",
				reverseReply:"其实人就是这样",
				bookComment:"很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对事物的发…",
				userful:"689",
				transmit:"22",
				bookUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
				bookName:"一个人的朝圣",
				stars:"5",
				commentsNum:"30258",
				top:1
			}
		]
	},
	
  },

	onChange(e) {
	    this.setData({
	      keyword: e.detail
	    });
	  },
	onSearch(e) {
	    Toast('搜索' + this.data.keyword);
	  },
	  onFocus(e){
		  wx.navigateTo({
		    url: '../hot-search/hot-search'
		  })
	  },
	  /**
	   * @description ' tab页面切换；
	   * */
	   onTabChange(event) {
		  
		   // 组件绑定来的id;
		  let id=event.target.dataset.id;
		  let catename=event.target.dataset.name;
		   if(id!==null){
			   wx.navigateTo({
			     url: '../catagory-detail/catagory-detail?id='+id+'&cateName='+catename
			   })
		   }
		  
		   
	    },
		goCatagoryDetail(e){
			// 组件绑定来的id;
			let id=e.target.dataset.id;
			let catename=e.target.dataset.name;
			wx.navigateTo({
			  url: '../catagory-detail/catagory-detail?id='+id+'&cateName='+catename
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
			 console.log(res);
			 let tabs=res.data;
			 tabs.unshift({
				 parent:null,
				 name:"推荐",
				 id:null,
				 totalBooks:0
			 });
			 that.setData({
				 tabs
			 });
		      
		  }).catch(function (error) {
		      console.log(error);
		  });
	},
	
	getCategoryBookInfo(){
		  let that=this;
		  let reqData={}
		  api._fetch({
		      url: '/api/category/book/hot.list',
		      data:reqData,
		      method:'get',
			  contentType:1
		  }).then(function (res) {
			 console.log(res);
			 let categoryBookInfo=res.data;
			 that.setData({
				 categoryBookInfo
			 });
			
		      
		  }).catch(function (error) {
		      console.log(error);
		  });
	},
	
	  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getBannerList();
	this.getCategoryBookInfo();
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