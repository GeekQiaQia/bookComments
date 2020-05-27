//app.js
const api = require('./utils/request.js')
let sessionKey="";


App({
  getSettingInfo:function(){
	
	// 获取用户信息
	wx.getSetting({
	  success: res => {
		  console.log(res);
	    if (res.authSetting['scope.userInfo']) {
	      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
	      wx.getUserInfo({
	        success: res => {
	          // 可以将 res 发送给后台解码出 unionId
	          this.globalData.userInfo = res.userInfo
	          console.log(res);
	          let loginInfo=null;
	     
	          try {
	            var value = wx.getStorageSync('loginInfo')
	            if (value) {
	              console.log(value);
	              loginInfo=value;
	              // Do something with return value
	              let reqData={
	                encryptedData:res.encryptedData,
	                iv:res.iv,
	                rawData:res.rawData,
	                sessionKey:loginInfo.sessionKey,
	                signature:res.signature
	              }
	              api._fetch({
	                url: '/api/i/info',
	                data:JSON.stringify(reqData),
	                method:'post'
	            }).then(function (res) {
	                console.info(res)
	            }).catch(function (error) {
	                console.log(error);
	            });
	            }
	          } catch (e) {
	            // Do something when catch error
	          }
	
	  
	          try{
	 
	            // 同步接口立即写入
	           
	            wx.setStorageSync('userInfo',res.userInfo )
	 
	           
	          }catch (e) {
	           
	            console.log('写入value2发生错误')
	           
	          }
	       
	
	          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
	          // 所以此处加入 callback 以防止这种情况
	          if (this.userInfoReadyCallback) {
	            this.userInfoReadyCallback(res)
	          }
	        }
	      })
	    }else{
			// 提示需要获取权限设置；
			wx.showModal({
				title:'提示！',
				confirmText:'去设置',
				showCancel:false,
				content:'请授权'
			})
		}
	  }
	})  
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that=this;

    // 登录
	wx.login({
	  success (res) {
		  // 发送 res.code 到后台换取 openId, sessionKey, unionId
	    if (res.code) {
	     
		  console.log(res.code);
		  let reqData={code:res.code}
		  api._fetch({
		      url: '/api/wx/login',
		      data:reqData,
		      method:'get'
		  }).then(function (res) {
          
          wx.setStorageSync('loginInfo',res.data )
		  wx.setStorageSync('userToken',res.data.token )
		  that.getSettingInfo();
		  }).catch(function (error) {
		      console.log(error);
		  });
	    } else {
	      console.log('登录失败！' + res.errMsg)
	    }
	  }
	})
 
  
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },

  globalData: {
    userInfo: null,
	
  }
})