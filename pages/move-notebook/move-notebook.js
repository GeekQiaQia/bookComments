// pages/move-notebook/move-notebook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * @description 跳转到新建笔记本
   * */
   handleNewNotebook:function(e){
  	wx.navigateTo({
  	  url: '../new-notebook/new-notebook'
  	})
   },
  /**
   * @description: 返回读书笔记
   * */
  handleGoBack:function(e){
  	wx.navigateBack({
  		url: '../my-notes/my-notes'
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