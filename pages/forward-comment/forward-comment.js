// pages/forward-comment/forward-comment.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  placeholder:"写下你的评论",
	  notebook:"我的笔记本",
	  note:false,
	  noteBookRadio:"",
	  item:{},
	  notesInfo:{},
	  messages:"",
	  messagesLen:0,
	  show:false,
	  showNoteList:false,
	  text:"读之前以为是宗教信仰类读物，以为是一本心灵鸡汤。读完之后内心得到极大的触动，泪崩了好几次。是真真正正被震慑到的心痛。作者的手法非常细腻，许多在文学作品中会回避或者忽略的问题，她都一一直面阐述，甚至作为本书的重点，这让我很意外也很动容。我们生而为人，是带着标签来的，标签的不可选择性，令我们终其一生，都想将这些标签抹去，然而这些标签刻在肉里，不剥皮流血是抹不去的。有些人就这样带着标签过完一辈子，并且把标签又留给自己的孩子。有些人，到人生快到尽头，才想起来抗争一番。但永远不晚，我们最终将要成为的是符合我们意志的人，这个理念会随着环境的变化而调整，而最终，我们将以任何方式获得自我救赎。这也是我们人生的唯一目的。"
	  

  },
  /**
   * @description:发送书评
   * */
  handleSendComment(e){
	  let that=this;
	  let messagesLen=this.data.messagesLen;
	  if(messagesLen==0){
		  wx.showToast({
		    title: '评论内容不可为空哦',
		    mask:true,
		    icon: 'none',
		    duration: 3000
		  })
	  }else{
		  let comment=this.data.item.id,
		  		  content=this.data.messages,
		  		  note=this.data.note,
				  userInfo=wx.getStorageSync('userInfo'),
		  		  notebook=this.data.noteBookRadio;
		  let reqData={
		  		  comment,
		  		  content,
		  		  forward:true,
		  		  note,
		  		  notebook,
		  		  reply:true
		  		  
		  }
		  let that=this;
		  api._fetch({
		      url: '/api/i/comment/forward',
		      data:reqData,
		      method:'post',
		  	  contentType:1
		  }).then(function (res) {
		  	
		  			 // 此处发送修改交易；
		  			 if(res.statusCode===200){
						 
						
						 let successInfo={
							
							 bookName:that.data.item.bookInfo.name,
							 content,
							 nickName:userInfo.nickName
						 }
						 if(note){
						 	 successInfo['notebook']=that.data.notebook
						 }else{
							 successInfo['notebook']=null
						 }
						wx.setStorageSync("successInfo",successInfo)
						wx.redirectTo({
							 url:'../forward-success/forward-success'
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
	  }

  },
  handleSelectNoteInfo(event){
	
	  let noteInfo=this.data.notesInfo.content;
	  let noteBookRadio=this.data.noteBookRadio;
	  let note=noteInfo.filter(item=>{
		  return item.id==noteBookRadio;
	  });
	
	  let notebook=note[0].name
	  this.setData({
		  notebook,
		  showNoteList:false,
	  });
	
	 
  },
  handleNotebookSelected(e){
	
	  this.setData({
	       noteBookRadio: e.target.dataset.id,
	     });
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
  	 
  	   			 // 此处发送修改交易；
  	   			 if(res.statusCode===200){
  	   	// 			let notesInfo=that.data.notesInfo;
  					// notesInfo.notebooks=res.data;
  					// notesInfo.notebookNum=res.data.length;
  					// that.setData({
  					// 	notesInfo
  					// });
  					let notesInfo=res.data;
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
  showNotebookList(e){
	  this.setData({
	  			  showNoteList:true
	  });
  },
  onChange(event){
	
	  let note=this.data.note;
	  if(note){
		  this.setData({
		       note:false,
		     });
	  }else{
		  this.setData({
		       note:true,
		     });
	  }
	 
  },
  /**
   * @description:处理输入中的书评详细；
   * */
	 handlMessagesInput(e){
		  let len=e.detail.value.length;
		  this.setData({
			messagesLen:len,
			messages:e.detail.value
		  });
	  },
	  checkMore(e){
		  this.setData({
			  show:true
		  });
	  },
	  onClickHide(e){
		  this.setData({
			  show:false
		  });
	  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let item=wx.getStorageSync('item')
	
	this.setData({
		item
	});
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
  onShareAppMessage: function () {

  }
})