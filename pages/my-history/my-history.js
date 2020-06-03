// pages/my-history/my-history.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  operationInfo:[],
	  historyInfo:[
		  {
		  			  date:"02月3日",
		  			  todoList:[
		  					{
		  						time:"08:02",
		  						operator:"添加",
		  						title:"金融笔记本"
		  					},
		  					{
		  						time:"13:02",
		  						operator:"推荐了",
		  						title:"《一个人的朝圣》的相关影片"
		  					}
		  					
		  				]
		  },
		  {
			  date:"01月21日",
			  todoList:[
					{
						time:"08:02",
						operator:"添加",
						title:"金融笔记本"
					},
					{
						time:"13:02",
						operator:"推荐了",
						title:"《一个人的朝圣》的相关影片"
					},
					{
						time:"17:27",
						operator:"写了",
						title:"《追风筝的人》的精彩书评"
					}
					
				]
		  },
		  {
		  			  date:"01月21日",
		  			  todoList:[
		  					{
		  						time:"08:02",
		  						operator:"添加",
		  						title:"金融笔记本"
		  					},
		  					{
		  						time:"13:02",
		  						operator:"推荐了",
		  						title:"《一个人的朝圣》的相关影片"
		  					},
		  					{
		  						time:"17:27",
		  						operator:"写了",
		  						title:"《追风筝的人》的精彩书评"
		  					}
		  					
		  				]
		  },
		  {
		  			  date:"01月21日",
		  			  todoList:[
		  					{
		  						time:"08:02",
		  						operator:"添加",
		  						title:"金融笔记本"
		  					},
		  					{
		  						time:"13:02",
		  						operator:"推荐了",
		  						title:"《一个人的朝圣》的相关影片"
		  					},
		  					{
		  						time:"17:27",
		  						operator:"写了",
		  						title:"《追风筝的人》的精彩书评"
		  					}
		  					
		  				]
		  },
		  {
		  			  date:"01月21日",
		  			  todoList:[
		  					{
		  						time:"08:02",
		  						operator:"添加",
		  						title:"金融笔记本"
		  					},
		  					{
		  						time:"13:02",
		  						operator:"推荐了",
		  						title:"《一个人的朝圣》的相关影片"
		  					},
		  					{
		  						time:"17:27",
		  						operator:"写了",
		  						title:"《追风筝的人》的精彩书评"
		  					}
		  					
		  				]
		  }
	  ]
  },
 
 /**
  * @description；获取历史操作列表
  * 
  * */
 
  getOperationList:function(){
 	   let reqData={
 		   page:0,
 		   size:10
 	   }
 	   let that=this;
 	   api._fetch({
 	       url: '/api/i/operation/list',
 	       data:reqData,
 	       method:'get',
 	   	contentType:1
 	   }).then(function (res) {
 	
 	   			 // 此处发送修改交易；
 	   			 if(res.statusCode===200){
 	   	// 			let notesInfo=that.data.notesInfo;
 					// notesInfo.notebooks=res.data;
 					// notesInfo.notebookNum=res.data.length;
 					// that.setData({
 					// 	notesInfo
 					// });
 					let operationInfo=res.data;
 					that.setData({
 						operationInfo
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
	this.getOperationList();
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