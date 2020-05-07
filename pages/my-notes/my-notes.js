// pages/my-notes/my-notes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		notesInfo:{
				num:0,
				list:[
					{	status:0,
						date:"2020/2/20",
						info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～"
					},
					{
						status:0,
						date:"2020/2/20",
						info:"你的书评《一个人的朝圣》被用户 林十三 回复，快去查看吧～"
					},
					{	status:1,
						date:"2020/2/20",
						info:"你对书籍《一个人的朝圣》推荐的影片，已被平台收录并整理，前去查看～"
					}
				]
			}
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
  onShareAppnotes: function () {

  }
})