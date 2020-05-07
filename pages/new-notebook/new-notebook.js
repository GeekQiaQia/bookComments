// pages/new-notebook/new-notebook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	title:"",
	titleLen:0,
	description:"",
	descriptionLen:0,
	disabled:true,
  },
	
	/**
	 * @description
	 * */
	 handlTitleInput:function(e){
		let len=e.detail.value.length;
		this.setData({
		  titleLen:len,
				title:e.detail.value
		});
		if(this.data.titleLen>=1){
				  
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
	 	  let titleLen=this.data.titleLen;
	 	  if(titleLen<1){
	 		  
	 	  }else{
	 		  let title=this.data.title;
	 		  console.log(title);
			// 此处发送修改交易；
			wx.showToast({
			  title: '新建成功',
			  mask:true,
			  icon: 'success',
			  duration: 5000
			})
			wx.navigateTo({
			  url: '../my-notes/my-notes'
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