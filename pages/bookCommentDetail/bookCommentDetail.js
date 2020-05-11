// pages/bookCommentDetail/bookCommentDetail.js
//获取应用实例
const api = require('../../utils/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxStars:5,
	visible: false,
	userInfo: {},
	bookInfo:{
    url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
    star:3
	},
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
   * @description；获取书评详情
   * 
   * */
  
   getBookCommentDetail:function(){
  	   let reqData={
  		   id:1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let name="loginInfo.name"
		console.log(app.globalData.userInfo);
		if (app.globalData.userInfo) {
		
      this.setData({
        userInfo: app.globalData.userInfo,
		 [name]:app.globalData.userInfo.nickName,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
		   [name]:res.userInfo.nickName,
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
			 [name]:res.userInfo.nickName,
            hasUserInfo: true
          })
        }
      })
    }
	console.log(this.data.userInfo)
	this.getBookCommentDetail();
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