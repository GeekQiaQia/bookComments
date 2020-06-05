//index.js
//获取应用实例
const api = require('../../utils/request.js')
const app = getApp()


Page({
  data: {
	cardInfoArray:[],
	loading:false,
    userInfo: {},
	swiperList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	starMax:5,
	readMore:true
  },
  /**
   * @description:处理进入书评详情；
   * 
   * */
  handleCommentDetail:function(e){
	
	  // 组件传参过来的id;
	  let id=e.detail.id;
	  let itemindex=e.detail.itemIndex;
	  let cardInfoArray=this.data.cardInfoArray;
	  // let item=cardInfoArray.filter(item=>{
		 //  return item.id==itemindex;
	  // });
	  // console.log(item);
	  // wx.setStorageSync('item',item[0])
	  wx.navigateTo({
	    url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemindex+'&id='+id
	  })
  },
  /**
   * @description:处理点击banner图片进入活动页面
   * */
  handleImageTap:function(e){
	  
	  let tapName=e.target.dataset.itemname;
	  let id=e.target.dataset.id;
	  if(tapName=="ActivityRecommend"){
		  wx.navigateTo({
		    url: '../week-activity/week-activity?id='+id
		  })
	  }else if(tapName=="Top10"){
		  wx.navigateTo({
		    url: '../top-recommend/top-recommend'
		  })
	  }else if(tapName=="NewBook"){
		  // wx.navigateTo({
		  //   url: '../top-recommend/top-recommend'
		  // })
	  }
  },
  
  /**
   * @description:获取用户信息；
   * */
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
		  let activity=swiperList.filter(item=>{
		  				  return item.url=="ActivityRecommend";
		  });
		  let imageSrcs=activity[0].describes
		   wx.setStorageSync('imageSrcs',imageSrcs)
		 
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
		// try {
			
  //     let userInfo = wx.getStorageSync('userInfo')
  //     if (userInfo) {
     
  //       // Do something with return value
  //       this.globalData.userInfo = res.userInfo
  //     }
  //   } catch (e) {
  //     // Do something when catch error
  //   }
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
	
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
    }
})
