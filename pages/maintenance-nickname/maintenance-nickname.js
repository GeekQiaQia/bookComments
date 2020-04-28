// pages/maintenance-nickname/maintenance-nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	nickname:"",
	disabled:true,
	nicknameLen:0
  },
  handlNicknameInput:function(e){
	  let len=e.detail.value.length;
	  this.setData({
	    nicknameLen:len
	  });
	  if(this.data.nicknameLen>=2){
		  
		  this.setData({
			  
		    disabled:false,
			
		  });
		  
	  }else{
		  this.setData({
		  			  
		    disabled:true,
		  			
		  });
	  }
  },
  handleSave:function(e){
	  // 此处发送修改就要；
	  let nicknameLen=this.data.nicknameLen;
	  if(nicknameLen<2){
		  
	  }else{
		  // 此处发送修改交易；
		  wx.showToast({
		    title: '已发送',
		    mask:true,
		    icon: 'success',
		    duration: 5000
		  })
		  wx.redirectTo({
		    url: '../info-maintenance/info-maintenance',
		  })
	  }
	
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