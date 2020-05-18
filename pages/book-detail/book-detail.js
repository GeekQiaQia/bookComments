// pages/bookCommentDetail/bookCommentDetail.js
//获取应用实例
const api = require('../../utils/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  scrollHeight:"",
	  active: 0,
	  loading:true,
	  progress:"61.8%",
	  tabs:[
	  	{tab:"书籍简介",name:"bookResume",info:"哈罗德•弗莱，六十岁，在酿酒厂干了四十年销售代表后默默退休，没有升迁，既无朋友，也无敌人，退休时公司甚至连欢送会都没开。他跟隔阂很深的妻子住在英国的乡间，生活平静，夫妻疏离，日复一日。一天早晨，他收到一封信，来自二十年未见的老友奎妮。她患了癌症，写信告别。震惊、悲痛之下，哈罗德写了回信，在寄出的路上，他由奎妮想到了自己的人生，经过了一个又一个邮筒，越走越远，最后，他从英国最西南一路走到了最东北，横跨整个英格兰。87天，627英里，只凭一个信念：只要他走，老友就会活下去！这是哈罗德千里跋涉的故事。从他脚步迈开的那一刻起，与他六百多英里旅程并行的，是他穿越时光隧道的另一场旅行。这个小说是这两年从英国、德国、到美国到台湾地区的黑马畅销作品，入围了2012年的布克文学奖，作者是英国的知名编剧，她第一次尝试写小说，她的语言真好，让人只想大段引用，她真细腻，女作家的穿针走线、静水流深的细腻，扩大了我的感官触觉，她讲了一个好故事，她介绍我认识了一个朋友——哈罗德，这个受伤的小孩，这个沉默的男人，这个妻子眼里的窝囊废，这个人生的loser，当我跟他一起一层一层靠近他自己，他毫无疑问地成了陪伴我的老朋友。《泰晤士报》有人评论说，“自从遇见哈罗德的那一刻起，我再也不想离开他。”而当那天傍晚我终于读完这个故事，把纸稿一推，伏在桌上大哭了一阵。我想，只有人类会不断地犯错，也只有人类才能如此承受，我是多么理解沉重而孤独的滋味啊，而哈罗德最终历经磨难获得重生。那一刻正如闷热无风的夏天里终于降下了一场凉爽的雨。"},
	  	{tab:"精彩评论",name:"topComments",info:"精彩评论"},
	  	{tab:"影片推荐",name:"videoRecommend",info:"影片推荐"}
	  ],
    maxStars:5,
	visible: false,
	userInfo: {},
	bookInfo:{
		bookStar:{
			oneStar:"0.1%",
			people: 150,
			score: 8.5,
			twoStar: "20%",
			threeStar: "30%",
			fourStar: "40%",
			fiveStar: "50%",
			resource: "system",
			id: 1
		}
	},
	cardInfoArray:[
		
	],
	filmInfo:[],
	movieStarArray:[],
	movieId:0,
	item:{
		  	title:"《蘑菇屋》",
		  	forward:"10",
		  	reply:"10",
		  	like:"10058",
		  	resume:"读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重点，这让我很意外也很动容。我们生而为人，是带着标签来的，标签的不可选择性，令我们终其一生，都想将这些标签抹去，然而这些标签刻在肉里，不剥皮流血是抹不去的。有些人就这样带着标签过完一辈子，并且把标签又留给自己的孩子。有些人，到人生快到尽头，才想起来抗争一番。但永远不晚，我们最终将要成为的是符合我们意志的人，这个理念会随着环境的变化而调整，而最终，我们将以任何方式获得自我救赎。这也是我们人生的唯一目的。",
		    star:3,
			time:"2020-04-14",
		  	notice:"转发",
		  	name:"林间小鹿",
			readMore:false,
		  	iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
		  },
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				hasUserInfo:false
  },
 
  /**
     * @description 获取
  书对应的电影信息详情；
     * @param { bookId} id 
     * */
     getMovieDetail:function(book){
    	   let reqData={
    	     	book,
    			page:0,
    			size:10
    	   }
    	   let that=this;
    	   api._fetch({
    	       url: ' /api/movie/detail',
    	       data:reqData,
    	       method:'get',
    		   contentType:1
    	   }).then(function (res) {
    	   	 console.log(res);
    	   			 // 此处发送修改交易；
    	   			 if(res.statusCode===200){
    	  //  			let cardInfoArray=res.data.content;
    			
    			// 	for(let item of cardInfoArray ){
    			// 		item['readMore']=false;
    			// 	}
    			// 	that.setData({
    			// 		cardInfoArray
    			// 	});
    	   			 }else{
    	   				 wx.showToast({
    	   				   title: res.message,
    	   				   mask:true,
    	   				   icon: 'none',
    	   				   duration: 3000
    	   				 })
    	   			 }
    	   			
    	       
    	   }).catch(function (error) {
    	       console.log(error);
    	   });
     }, 
  /**
   * @description 获取
书对应的电影信息；
   * @param { bookId} id 
   * */
   getBookRecommendList:function(book){
  	   let reqData={
  	     	book,
  			page:0,
  			size:10
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/movie/in.book',
  	       data:reqData,
  	       method:'get',
  		   contentType:1
  	   }).then(function (res) {
  	   	 console.log(res);
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
  	   			let filmInfo=res.data.content;
  			    that.getActorList(filmInfo[0].id);
  			    console.log(filmInfo[0].id);
  				that.setData({
  					filmInfo,
					movieId:filmInfo[0].id
  				});
  	   			 }else{
  	   				 wx.showToast({
  	   				   title: res.message,
  	   				   mask:true,
  	   				   icon: 'none',
  	   				   duration: 3000
  	   				 })
  	   			 }
  	   			
  	       
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   }, 
   
  /**
   * @description  获取电影相关的明星；
   * 
   * */ 
	
	getActorList:function(movie){
		let reqData={
		  	movie,
					page:0,
					size:10
		}
		let that=this;
		api._fetch({
		    url: '/api/movie/actor/list',
		    data:reqData,
		    method:'get',
				   contentType:1
		}).then(function (res) {
			 console.log(res);
					 // 此处发送修改交易；
					 if(res.statusCode===200){
					let movieStarArray=res.data.content;
					  that.setData({
						movieStarArray  
					  });
				
					 }else{
						 wx.showToast({
						   title: res.message,
						   mask:true,
						   icon: 'none',
						   duration: 3000
						 })
					 }
					
		    
		}).catch(function (error) {
		    console.log(error);
		});
	},
  /**
   * @description 获取书籍评论详情；
   * @param { bookId} id 
   * */
   getBookCommentList:function(book){
	   let reqData={
	     	book,
			page:0,
			size:10
	   }
	   let that=this;
	   api._fetch({
	       url: '/api/book/comment.list',
	       data:reqData,
	       method:'get',
		   contentType:1
	   }).then(function (res) {
	   	 console.log(res);
	   			 // 此处发送修改交易；
	   			 if(res.statusCode===200){
	   			let cardInfoArray=res.data.content;
			
				for(let item of cardInfoArray ){
					item['readMore']=false;
				}
				that.setData({
					cardInfoArray
				});
	   			 }else{
	   				 wx.showToast({
	   				   title: res.message,
	   				   mask:true,
	   				   icon: 'none',
	   				   duration: 3000
	   				 })
	   			 }
	   			
	       
	   }).catch(function (error) {
	       console.log(error);
	   });
   }, 
  
  
  /**
   * @description；获取书评详情
   * 
   * */
  
   getBookCommentDetail:function(id){
  	   let reqData={
  		   id
  	   }
  	   let that=this;
  	   api._fetch({
  	       url: '/api/book/detail',
  	       data:reqData,
  	       method:'get',
  	   	contentType:1
  	   }).then(function (res) {
  	   	 console.log(res);
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
  	   			  let bookInfo=res.data;
				   wx.setNavigationBarTitle({
				        title: bookInfo.name
				      })
				  let author=[];
				  let translators=[];
				  let allAuthors=bookInfo.authors;
				  if(allAuthors!==null){
					  author=allAuthors.filter(item=>{
						  return item.translator==false;
					  });
					  translators=allAuthors.filter(item=>{
						  return item.translator==true;
					  });
				  }
				  bookInfo.authors={
					  author,
					  translators
				  }
				  
				  that.setData({
					  bookInfo
				  });
  	   			 }else{
  	   				 wx.showToast({
  	   				   title: res.message,
  	   				   mask:true,
  	   				   icon: 'none',
  	   				   duration: 3000
  	   				 })
  	   			 }
  	   			
  	       
  	   }).catch(function (error) {
  	       console.log(error);
  	   });
   },
   /**
	* @description  跳转到评分详情
	* 
	* */
	goScoreDetail(e){
		console.log(e);
		// 组件绑定来的bookName;
		let bookname=e.target.dataset.bookname;
		wx.navigateTo({
		  url: '../score-detail/score-detail?bookName='+bookname
		})
		
	},
   handleAuthorDetail(e){
	   // 组件绑定来的id;
	   let id=e.target.dataset.id;
	   wx.navigateTo({
	     url: '../author-detail/author-detail?id='+id
	   })
   },
   handlePressDetail(e){
	  // 组件绑定来的id;
	    let id=e.target.dataset.id;
	   wx.navigateTo({
	     url: '../press-detail/press-detail?id='+id
	   })
   },
   
 
   
   
   /**
	* @description  推荐影片
	* 
	* */
   goRecommendFilm(e){
	   let reqData={
	     		   book:"",
				   describes:"",
				   name:""
	   }
	   let that=this;
	   api._fetch({
	       url: '/api/i/recommend/movie',
	       data:reqData,
	       method:'post',
	   	contentType:1
	   }).then(function (res) {
	   	 console.log(res);
	   			 // 此处发送修改交易；
	   			 if(res.statusCode===200){
	   			
	   			 }else{
	   				 wx.showToast({
	   				   title: res.message,
	   				   mask:true,
	   				   icon: 'none',
	   				   duration: 3000
	   				 })
	   			 }
	   			
	       
	   }).catch(function (error) {
	       console.log(error);
	   });
   },
  
    /**
     *动态计算scrollview 高度；
     *  
     * 
    */
    computeScrollViewHeight:function(){
      // 获取到的单位px;
      let width=wx.getSystemInfoSync().windowWidth;
      let height=wx.getSystemInfoSync().windowHeight;
	  console.log(width,height);
      // rpx与px 之间的换算：750rpx /windowWidth=屏幕高度rpx/windowHeight;
      let screeHeight=750*height/width;
	  console.log(screeHeight);
      // 设置出其余view的高度； swiperHeight=420rpx;tabBarHeight=139rpx
      let scroll_height=screeHeight-166;
  
      this.setData({
        scrollHeight:scroll_height
      });
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//路由传参书籍id;forTest
	let id=options.id;
   
   //let id="2"
	this.getBookCommentDetail(id);
	this.getBookCommentList(id);
	this.getBookRecommendList(id);
	this.computeScrollViewHeight();
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
  onShareAppMessage: function (ops) {
	if(ops.from==='button'){
		// 转发事件来源。
		console.log(ops.target);
	}
	  return {
	      title: '自定义转发标题',
	      path: '/index/index?id=123'
	    }
	
  },
  close: function() {
    this.setData({ visible: false })
  }
})