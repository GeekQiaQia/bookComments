// pages/maintenance-phone/maintenance-phone.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	phoneNumber:"",
	validCode:"",
	disabled:false,
	checkValid:false,
	start:false,
	counter:60
  },
  
  /**
   * 开始倒计时；
   * */ 
  startCount:function(counter){
	  
	  this.setData({
			start:true
		});
	 	let that=this;		
		let timer=setInterval(()=>{
			counter--;
			that.setData({
				counter
			});
		},1000)
	    setTimeout(()=>{
			clearInterval(timer);
			that.setData({
						start:false,
						counter:60
					});
		},counter*1000)
		
  },
  /**
   * 
   *  @description 获取验证码
   * **/
  getValidCode:function(e){

	  let that=this;
	  let counter=this.data.counter;
	  let phone=this.data.phoneNumber;
	  
	  let reg = /^[1][0-9][0-9]{9}$/;
	  if (!reg.test(phone)) {
			  wx.showToast({
				title: '手机号格式校验错误',
				mask:true,
				icon:'none',
				duration: 2000
			  })
		 }else{
			 let reqData={
			 		  phone 
			 }
			 
			 api._fetch({
			     url: '/api/send/phone-code',
			     data:reqData,
			     method:'get',
			 	  contentType:1
			 }).then(function (res) {
			     console.info(res)
			 		  if(res.data.success){
			 			  wx.showToast({
			 			    title: '发送成功',
			 			    mask:true,
			 			    icon: 'success',
			 			    duration: 2000
			 			  })
			 		  }
			 		  // 开始倒计时；
			 		  that.startCount(counter);
			 
			 		  // 此处发送修改交易；
			 
			 }).catch(function (error) {
			     console.log(error);
			 		  
			 });
		 }

  },
  /**
   * @description  修改个人维护信息；
   * */
  updateInfoMaintenance(reqData){
  	
  	  api._fetch({
  	      url: '/api/i/bindMobile',
  	      data:reqData,
  	      method:'post',
  		  contentType:1
  	  }).then(function (res) {
  	      console.info(res)
  		  // 此处发送修改交易；
  		  wx.showToast({
  		    title: '已发送',
  		    mask:true,
  		    icon: 'success',
  		    duration: 3000
  		  })
  		  
  		  wx.redirectTo({
  		    url: '../info-maintenance/info-maintenance',
  		  })
  	  }).catch(function (error) {
  	      console.log(error);
  	  });
  },
  handlPhoneNumberInput:function(e){
	  this.setData({
	  		phoneNumber:e.detail.value
	  });
	  
  },
  handlePhoneInputBlur:function(e){
	  let phoneNumber=e.detail.value;
	  let reg = /^[1][0-9][0-9]{9}$/;
	  if (phoneNumber == "" || phoneNumber == 'undefined' || phoneNumber == null) {
	  	wx.showToast({
	  					title: '请输入正确的手机号',
	  					mask:true,
	  					icon:'none',
	  					duration: 2000
	  	})
	  	return;
	  } else if (reg.test(phoneNumber)) {
	  	
	  } else {
	  	wx.showToast({
	  					title: '手机号码格式错误',
	  					mask:true,
	  					icon:'none',
	  					duration: 2000
	  	})
	  	return;
	  }
	  
  },
  handlvalidCodeInput:function(e){
	  this.setData({
	  		validCode:e.detail.value
	  });
  },
  handleSave:function(e){
		let code=this.data.validCode,
		    reqData={},
		    phoneNumber=this.data.phoneNumber;
			let reg = /^[1][0-9][0-9]{9}$/;
			if (phoneNumber == "" || phoneNumber == 'undefined' || phoneNumber == null) {
				wx.showToast({
								title: '请输入正确的手机号',
								mask:true,
								icon:'none',
								duration: 2000
				})
				return;
			} else if (reg.test(phoneNumber)) {
				
			} else {
				wx.showToast({
								title: '手机号码格式错误',
								mask:true,
								icon:'none',
								duration: 2000
				})
				return;
			}
			
			if(code==''){
				wx.showToast({
								title: '验证码输入不可为空',
								mask:true,
								icon:'none',
								duration: 2000
				})
				return;
			}
			
			
		   if(code!==''&&phoneNumber!==''){
			   reqData={
			   	code,
			   	phoneNumber 
			   	
			   };
		   }
	
		this.updateInfoMaintenance(reqData);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let maintenanceInfo=wx.getStorageSync('maintenanceInfo');
	let {phoneNumber}=maintenanceInfo;
	this.setData({
		phoneNumber:phoneNumber
	});
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