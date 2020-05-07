//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/request.js')

Page({
  data: {
	  cardInfoArray:[
		{
			title:"《蘑菇屋》",
			forward:"9",
			reply:"10",
			like:"10058",
			resume:"看书之后，震撼人心，书中对主角阿米尔的心里描写很深刻，也揭露人性的灰色地带，小时候评判世界的标准就是好人与坏人之区别，长大了与复杂社会的碰撞，每一次碰壁也慢慢了解人性这中不仅有黑白之分，还有书中对主角阿米尔的心里描写很深刻，也揭露人性的灰色地带，小时候评判世界的标准就是好人与坏人之区别，长大了与复杂社会的碰撞，",
			star:5,
			time:"2020-04-13",
			notice:"读过",
			name:"林间小鹿",
			readMore:false,
			iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
		},
		  {
		  	title:"《蘑菇屋》",
		  	forward:"10",
		  	reply:"10",
		  	like:"10058",
		  	resume:"看书之后，震撼人心，书中对主角阿米尔的心里描写很深刻，也揭露人性的灰色地带，小时候评判世界的标准就是好人与坏人之区别，长大了与复杂社会的碰撞，每一次碰壁也慢慢了解人性这中不仅有黑白之分，还有",
		    star:3,
			time:"2020-04-14",
		  	notice:"转发",
		  	name:"林间小鹿",
			readMore:false,
		  	iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
		  } ,
		   {
		   	title:"《蘑菇屋》",
		   	forward:"11",
		   	reply:"10",
		   	like:"10058",
		   	resume:"看书之后，震撼人心，书中对主角阿米尔的心里描写很深刻，也揭露人性的灰色地带，小时候评判世界的标准就是好人与坏人之区别，长大了与复杂社会的碰撞，每一次碰壁也慢慢了解人性这中不仅有黑白之分，还有",
		   	star:2,
			time:"2020-04-15",
		   	notice:"转发",
		   	name:"林间小鹿",
			readMore:false,
		   	iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"
		   }  
	  ],
    motto: 'Hello World',
	loading:false,
    userInfo: {},
	swiperList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleCommentDetail:function(e){
	  console.log(e);
	  wx.navigateTo({
	    url: '../bookCommentDetail/bookCommentDetail'
	  })
  },
  handleImageTap:function(e){
	  console.log(e)
	  let tapName=e.target.dataset.itemname;
	  if(tapName=="ActivityRecommend"){
		  wx.navigateTo({
		    url: '../week-activity/week-activity'
		  })
	  }else if(tapName=="topRecommend"){
		  
	  }else if(tapName=="newBook"){
		  
	  }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 
   * @description 获取广告页
   * */
  getBannerList(){
	  let that=this;
	  let reqData={
		 type:"DISCOVER"
	  }
	  api._fetch({
	      url: '/api/banner/details/in',
	      data:reqData,
	      method:'get',
		  contentType:1
	  }).then(function (res) {
		  let swiperList=res.data;
		  that.setData({
			 swiperList 
		  });
	      
	  }).catch(function (error) {
	      console.log(error);
	  });
  },
  /**
   * @description: 获取发现页书评列表
   * 
   * */
   getCommentInfo(){
	  
	 let that=this;
	 let reqData={
		 page:0,
		 size:10,
	 	 position :"DISCOVER"
	 }
	 api._fetch({
	     url: '/api/hot-comment/list',
	     data:reqData,
	     method:'get',
	 	contentType:1
	 }).then(function (res) {
	 	console.log(res);
		let cardInfoArray=res.data;
		for(let item of cardInfoArray ){
			item['readMore']=false;
		}
		console.log(cardInfoArray);
		that.setData({
			cardInfoArray
		});
	     
	 }).catch(function (error) {
	     console.log(error);
	 });
   },
  onLoad: function () {
		try {
			
      let userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
     
        // Do something with return value
        this.globalData.userInfo = res.userInfo
      }
    } catch (e) {
      // Do something when catch error
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
	
	this.getBannerList();
	this.getCommentInfo();

  },
   // 下拉刷新方法
   onPullDownRefresh: function() {
      // 显示标题栏进度条效果
      wx.showNavigationBarLoading();
      this.setData({
        loading:true 
      }, () => {
        // 取消标题栏进度条效果
        wx.hideNavigationBarLoading();
        // 取消页面刷新动画
        wx.stopPullDownRefresh();
      });
    },
   
    // 上拉加载方法
    onReachBottom: function() {
      // let _pageNo = this.data.pageNo + 1;
      // this.setData({
      //   pageNo: _pageNo,
      //   pageSrc: this.data.pageSrc
      // });
    },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
