// pages/my-notes/my-notes.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
		notesInfo:{
				notebookNum:2,
				empty:true,
				notebooks:[
					// "金融学","逻辑思考","大国的奔溃","三国志","基因社会","逻辑思考",
				]
			}
  },
  
  /**
   * @description；获取笔记本列表
   * 
   * */
  
   getNotebookList:function(){
	   let reqData={
		   page:0,
		   size:10
	   }
	   let that=this;
	   api._fetch({
	       url: '/api/i/notebook/list',
	       data:reqData,
	       method:'get',
	   	contentType:1
	   }).then(function (res) {
	   	 console.log(res);
	   			 // 此处发送修改交易；
	   			 if(res.statusCode===200){
	   				let notesInfo=that.data.notesInfo;
					notesInfo.notebooks=res.data;
					notesInfo.notebookNum=res.data.length;
					that.setData({
						notesInfo
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
   * @description 跳转到查看笔记本
   * */
   handleReviewNotebooks:function(e){
	   wx.navigateTo({
	     url: '../my-notebooks/my-notebooks'
	   })
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
	this.getNotebookList();
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