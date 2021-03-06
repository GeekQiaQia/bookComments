// pages/aboutMe/aboutMe.js
//获取应用实例
const api = require('../../utils/request.js')

const {formatTime} = require('../../utils/util.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  motto: 'Hello World',
    userInfo: {},
	unloginIcon:"../../images/Icon-User.png",
	loginInfo:{
		name:"未登录",
		signatureInfo:"个性签名",
		
	},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	statistics:{
		
	},
	maintenanceInfo:{}
  },
  handleMyReply:function(){
	  wx.navigateTo({
	    url: '../my-reply/my-reply',
	  })
  },
  handleMyRecommend:function(){
    wx.navigateTo({
      url: '../my-recommend/my-recommend',
    })
  },
  handleMyMessage:function(){
	  wx.navigateTo({
	    url: '../my-message/my-message',
	  })
  },
  handleMyHistory:function(){
    wx.navigateTo({
      url: '../my-history/my-history',
    })
  },
  handleFollowOther:function(){
	 wx.navigateTo({
	   url: '../follow-other/follow-other',
	 }) 
  },
  handleMyFollower:function(){
  	 wx.navigateTo({
  	   url: '../my-follower/my-follower',
  	 }) 
  },
  handleMyComments:function(){
	  wx.navigateTo({
	    url: '../my-comments/my-comments',
	  }) 
  },
  handleMyNotes:function(){
	  wx.navigateTo({
	    url: '../my-notes/my-notes',
	  }) 
  },
	getUserInfo: function(e) {
		console.log(e)
	   
		let userInfo=e.detail.userInfo;
		let name="loginInfo.name"
		 app.globalData.userInfo = userInfo;
		 console.log(userInfo.nickName);
		this.setData({
		  userInfo: userInfo,
		  [name]:userInfo.nickName,
		  hasUserInfo: true
		})
		
		try{
			
	 
		  // 同步接口立即写入
		  wx.setStorageSync('hasAuthed',true )
		  wx.setStorageSync('userInfo',userInfo )
		 
		 
		  console.log('写入value2成功')
		 
		}catch (e) {
		 
		  console.log('写入value2发生错误')
		 
		}  
		
	  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../info-maintenance/info-maintenance'
    })
  },
  /**
   * @description  获取登录用户信息
   * */
   getLoginUserInfo(){
  	 let that=this;
  	 api._fetch({
  	     url: '/api/i/user-info', 
  	     method:'get',
		 contentType:1
  	 }).then(function (res) {
  	   
  		 let {avatarUrl,phoneNumber,nickName,gender,birthday,sign,statistics}=res.data;
  		 if(birthday==null){
  			 birthday=formatTime(new Date().getTime(),".");
  		 }
  		 let maintenanceInfo={
  			 avatarUrl,
  			 phoneNumber,
  			 nickName,
  			 gender,
  			 birthday,
  			 sign
  		 }
		 wx.setStorageSync('statistics',statistics)
  		 that.setData({
  			 maintenanceInfo,
			 statistics
  		 })
  
  	 }).catch(function (error) {
  	     console.log(error);
  	 });
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
	 
	  
	  let name="loginInfo.name"
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
        try{
 
          // 同步接口立即写入
         
          wx.setStorageSync('userInfo',res.userInfo )
         
          console.log('写入value2成功')
         
        }catch (e) {
         
          console.log('写入value2发生错误')
         
        }   
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
          try{
 
            // 同步接口立即写入
           
            wx.setStorageSync('userInfo',res.userInfo )
           
            console.log('写入value2成功')
           
          }catch (e) {
           
            console.log('写入value2发生错误')
           
          }   
        }
      })
	  
    }
	
	
	
	
	
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
// 页面初始加载获取登录用户信息；
	  this.getLoginUserInfo();
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