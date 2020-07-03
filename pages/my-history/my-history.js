// pages/my-history/my-history.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  currentPage:0,
	  totalPages:0,
	  totalElements:0,
	  pageSize:10,
	  operationInfo:[],
	  historyInfo:[]
  },
  formatDate:function(date){
	  let dateInfo=date.split(' ');
	  let mounth=dateInfo[0].split('-')[1],
	      day=dateInfo[0].split('-')[2];
		  return mounth+"月"+day+"日"
	  
  },
  formatTime:function(date){
	   let dateInfo=date.split(' ');
  	  let hour=dateInfo[1].split(':')[0],
  	      minute=dateInfo[1].split(':')[1];
  		  return hour+":"+minute
  	  
  },
 
 /**
  * @description；获取历史操作列表
  * 
  * */
 
  getOperationList:function(page=0,size=50){
 	   let reqData={
 		   page,
 		   size
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
 	   	             let itemHistory={
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
		  };
				
 					let operationInfo=res.data.content;
					console.log(operationInfo);
					operationInfo=operationInfo.filter(item=>{
						return item.visible==true;
					});
					console.log(operationInfo);
					let dateMap=new Map();
					let historyInfo=that.data.historyInfo;
					//formatDate
					for(let item of operationInfo){
						let historyItem={};
						let date=that.formatDate(item.createTime);
						if(!dateMap.has(date)){
							dateMap.set(date,date);
							let todoList=operationInfo.filter(item=>{
								item['time']=that.formatTime(item.createTime);
								return that.formatDate(item.createTime)==date;
							})
							historyItem['date']=date;
							historyItem['todoList']=todoList;
							
							historyInfo.push(historyItem);
						}
					}
					console.log(historyInfo);
					let totalPages=res.data.totalPages;
					let totalElements=res.data.totalElements;
					that.setData({
						totalElements,
						totalPages,
 						historyInfo
 					});
					wx.hideLoading();
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
   let self = this;
	
	    // 显示加载图标
	
	   
		let totalElements=this.data.totalElements;
		let page=this.data.currentPage;
		let pageSize=this.data.pageSize;
		if(pageSize<totalElements){
			// page++;
			pageSize+=10;
			self.setData({
				currentPage:page,
				pageSize
			});
			wx.showLoading({
				
			  title: '更多加载中',
				
			})
			this.getOperationList(page,pageSize);
		}
		
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})