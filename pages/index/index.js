//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/request.js')

Page({
  data: {
	  cardInfoArray:[],
    motto: 'Hello World',
	loading:false,
    userInfo: {},
	swiperList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleCommentDetail:function(e){
	  console.log(e);
	  // 组件传参过来的id;
	  let id=e.detail.id;
	  wx.navigateTo({
	    url: '../bookCommentDetail/bookCommentDetail?id='+id
	  })
  },
  handleImageTap:function(e){
	  console.log(e)
	  let tapName=e.target.dataset.itemname;
	  if(tapName=="ActivityRecommend"){
		  wx.navigateTo({
		    url: '../week-activity/week-activity'
		  })
	  }else if(tapName=="Top10"){
		  wx.navigateTo({
		    url: '../top-recommend/top-recommend'
		  })
	  }else if(tapName=="NewBook"){
		  wx.navigateTo({
		    url: '../top-recommend/top-recommend'
		  })
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
