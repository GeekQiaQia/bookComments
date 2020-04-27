// pages/week-activity/week-activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	imageSrc:"../../images/joinActivity.png",
	recommendInfo:[
		{
			iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			bookName:"《一个人的朝圣》",
			name:"林间小路",
			like:648,
			liked:true,
			reason:"“为你，千千万万遍。”我想，小说描写了一种最为诚挚的情感，而且它让你相信有些东西依然存在。在这个没有人相信承诺的年代，让人再次看到承诺背后那些美丽复杂的情感。这是一本好看的书，它让你重新思考。"
		},
		{
			iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			bookName:"《时间停止的时候》",
			name:"夏之风",
			like:542,
			liked:false,
			reason:"60岁，87天，627英里，穿越苏格兰。他这一生仿佛都在等待做这件事，当他在路上，他的妻子也在心里进行着情感的穿越，那些疏离了二十年的情感慢慢复苏，故事背后的真相也被一点点揭开。我们有时候需要逃离才能看清，而最终我们都将把过去的一切放下重新生活。"
		},
		{
			iconUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg",
			bookName:"《无声告白》",
			name:"Steven",
			like:542,
			liked:false,
			reason:"一部主人公寻找自己的作品，也许也是作者自己寻找的过程。一个人烦闷生活多年之后，如何去找到活下去新的意义，看完这本书我认为走路真是包治百病的。走路可以放空自己，可以让身体的疲劳代替胡思乱想，可以有新的创意，可以关注到城市或者乡村你所没有见到过的或者从来没有意识到的场面。所以如果谁写一本中国人的《一个人的朝圣》，我更有意愿来好好看看。因为当代中国变革中，很多人找不到自己，他们如果走在路上看到城市乡村的极大出差异、路上遇到骗子小偷、也遇到真心帮助自己的人，那种反差和意义我认为远远胜过这本小说。联想到两部我看过的电影《夜-上海》和《人在囧途》，都是在特定旅程中寻找自己的电影，都是值得去看的。"
		}
	]
  },

	handleActivityRecommend:function(){
		wx.navigateTo({
		  url: '../activity-recommend/activity-recommend'
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