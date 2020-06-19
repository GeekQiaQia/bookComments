// pages/note-detail/note-detail.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	scrollHeight:"",
	noteDetail:{}
  },
  /**
   *动态计算scrollview 高度；
   *  
   * 
  */
  computeScrollViewHeight:function(){
    // 获取到的单位px;
    let width=wx.getSystemInfoSync().windowWidth;
    let height=wx.getSystemInfoSync().windowHeight;
   
    // rpx与px 之间的换算：750rpx /windowWidth=屏幕高度rpx/windowHeight;
    let screeHeight=750*height/width;
  
    // 设置出其余view的高度； swiperHeight=420rpx;tabBarHeight=139rpx
    let scroll_height=screeHeight-166;
    
    this.setData({
      scrollHeight:scroll_height
    });
  },
  getNoteDetail:function(id){
	  let reqData={
	  		 id
	  }
	  let that=this;
	  api._fetch({
	      url: '/api/i/note/detail',
	      data:reqData,
	      method:'get',
	  	contentType:1
	  }).then(function (res) {
	  
	  			 // 此处发送修改交易；
	  			 if(res.statusCode===200){
					 let noteDetail=res.data;
					 let name=noteDetail.userNotebook.name;
				 wx.setNavigationBarTitle({
					  title: name+"读书笔记"
					})
					that.setData({
						noteDetail
					});
	  			 }else{
	  				 wx.showToast({
	  				   title: res.message,
	  				   mask:true,
	  				   icon: 'none',
	  				   duration: 3000
	  				 })
	  			 }
	  			
	      
	  }).catch(function (error) {
	      console.log(error);
	  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let id=options.noteId;
	  this.getNoteDetail(id);
	  this.computeScrollViewHeight();
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