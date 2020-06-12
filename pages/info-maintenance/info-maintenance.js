// pages/info-maintenance/info-maintenance.js
const {formatTime}=require("../../utils/util.js")

const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	maintenanceInfo:{
		avatarUrl:"",
		nickName:"",
		phoneNumber:null,
		gender:"FEMALE",
		birthday:formatTime(new Date().getTime(),".")
		
	},
	modalName:null,
	currentDate: new Date().getTime(),
	    minDate: new Date(1970).getTime(),
	    formatter(type, value) {
	      if (type === 'year') {
	        return `${value}年`;
	      } else if (type === 'month') {
	        return `${value}月`;
	      }
	      return value;
	    }
		
	
  },
  /**
   * @description  修改个人维护信息；
   * */
  updateInfoMaintenance(reqData){
	 
	  
	  api._fetch({
	      url: '/api/me/update',
	      data:reqData,
	      method:'post',
		  contentType:1
	  }).then(function (res) {
	      console.info(res)
		  wx.showToast({
		    title: '修改成功',
		    mask:true,
		    icon: 'success',
		    duration: 5000
		  })
		

	  }).catch(function (error) {
	      console.log(error);
	  });
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
	   
		 let {avatarUrl,phoneNumber,nickName,gender,birthday,sign}=res.data;
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
		 that.setData({
			 maintenanceInfo
		 })

	 }).catch(function (error) {
	     console.log(error);
	 });
   },
   onInput(event) {
      this.setData({
        currentDate: event.detail
      });
    },
	onConfirm(event){
	
		let maintenanceInfo=this.data.maintenanceInfo;
		maintenanceInfo.birthday=formatTime(event.detail,".")
			
		this.setData({
		   currentDate: event.detail,
		   maintenanceInfo: maintenanceInfo,
		   modalName: null
		});
		let birthday=formatTime(event.detail,"-");
		let reqData={
				  birthday
		};
	
		this.updateInfoMaintenance(reqData);
	},
	onCancel(event){
		this.setData({
		  modalName: null
		})
	},
  hideModal:function(e){
	  this.setData({
	    modalName: null
	  })
  },

  showSexModal:function(e){
	this.setData({
	  modalName: e.currentTarget.dataset.target
	})
  },
  showAvatarModal:function(e){
	 this.setData({
	   modalName: e.currentTarget.dataset.target
	 }) 
  },
  showBirthdayModal:function(e){
	  this.setData({
	    modalName: e.currentTarget.dataset.target
	  })
  },
  handleSelection:function(e){
	  
	  let sex=e.target.dataset.sex;
	  let maintenanceInfo=this.data.maintenanceInfo;
		  maintenanceInfo.gender=sex;
		 
	  this.setData({
	    maintenanceInfo:maintenanceInfo,
		  modalName: null
	  })
	  let gender=maintenanceInfo.gender;
	  let reqData={
		  gender
	  };
	 
	  this.updateInfoMaintenance(reqData);
	  
  },
  handleSelectionAvatar:function(e){

	  let that=this;
	  let sourceType=[e.target.dataset.source];
	
	  wx.chooseImage({
		  count:1,
		   sizeType: ['original', 'compressed'],
		   sourceType,
		   success (res) {
		      // tempFilePath可以作为img标签的src属性显示图片
		    const tempFilePaths = res.tempFilePaths;
			let avatar=tempFilePaths[0];
			let reqData={
					  avatar
			};
		
			let avatarUrl=avatar;
			let maintenanceInfo=that.data.maintenanceInfo;
					  maintenanceInfo.avatarUrl=avatarUrl;
					 
			that.setData({
			  maintenanceInfo:maintenanceInfo,
			  modalName: null	  
			})
		 
			that.updateInfoMaintenance(reqData);
			},
			fail(err) {
				console.log(err);
			}
	  })
  },
  showChangePhoneNumber:function(e){
	  wx.navigateTo({
		  
	  		url: '../maintenance-phone/maintenance-phone',
	  })
  },
  showChangenickName:function(e){
	  wx.navigateTo({
		    url: '../maintenance-nickname/maintenance-nickname',
	  })
  },
  showChangeSignature:function(e){
	 wx.navigateTo({
	 		    url: '../maintenance-signature/maintenance-signature',
	 })
  },
  handleOtherPhoneLogin:function(e){
	  wx.navigateTo({
	  		    url: '../maintenance-phone/maintenance-phone',
	  })
  },
  /**
   * @description:
   * 
   * */
   getPhoneNumber:function(e){
	   console.log(e);
	   let that = this;
	   let rawData="";
	   let signature="";
	   let  loginInfo = wx.getStorageSync('loginInfo')
	   let iv = e.detail.iv,
	       encryptedData = e.detail.encryptedData;
		   wx.getUserInfo({
		     success: res => {
				 console.log(res);
				 signature=res.signature;
				 rawData=res.rawData;
				 
				 let reqData={
				 	 rawData,
				 	 encryptedData,
				 	 iv,
				 	 sessionKey:loginInfo.sessionKey,
				 	 signature
				  }
				 api._fetch({
				     url: '/api/i/phone',
				     data:reqData,
				     method:'post',
				 	
				 }).then(function (res) {
				     
				     that.getLoginUserInfo();
				 }).catch(function (error) {
				     console.log(error);
				 });
				 
				 }
				 
		})
	   
			 
		
			
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  // 页面初始加载获取登录用户信息；
	this.getLoginUserInfo();
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