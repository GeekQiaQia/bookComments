// pages/info-maintenance/info-maintenance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	maintenanceInfo:{
		iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
		nickname:"灵剑",
		sex:"0",
		
	},
	modalName:null
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
  handleSelection:function(e){
	  
	  let sex=e.target.dataset.sex;
	  let maintenanceInfo=this.data.maintenanceInfo;
		  maintenanceInfo.sex=sex;
	  this.setData({
	    maintenanceInfo:maintenanceInfo,
		  modalName: null
	  })
	  
  },
  showChangeNickname:function(e){
	  wx.navigateTo({
		    url: '../maintenance-nickname/maintenance-nickname',
	  })
  },
  showChangeSignature:function(e){
	 wx.navigateTo({
	 		    url: '../maintenance-signature/maintenance-signature',
	 })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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