// pages/post-comment/post-comment.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	noteTitle:"",
	postBookInfo:{},
	noteTitleLen:0,
	notesInfo:{},
	noteBookRadio:0,
	notes:"",
	notesLen:0,
	imgList: [],
	notebook:"我的笔记本",
	note:false,
	showNoteList:false,
  },
   
   ChooseImage() {
     wx.chooseImage({
       count: 4, //默认9
       sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album'], //从相册选择
       success: (res) => {
         if (this.data.imgList.length != 0) {
           this.setData({
             imgList: this.data.imgList.concat(res.tempFilePaths)
           })
         } else {
           this.setData({
             imgList: res.tempFilePaths
           })
         }
       }
     });
   },
   ViewImage(e) {
     wx.previewImage({
       urls: this.data.imgList,
       current: e.currentTarget.dataset.url
     });
   },
   DelImg(e) {
     wx.showModal({
       title: '召唤师',
       content: '确定要删除这段回忆吗？',
       cancelText: '再看看',
       confirmText: '再见',
       success: res => {
         if (res.confirm) {
           this.data.imgList.splice(e.currentTarget.dataset.index, 1);
           this.setData({
             imgList: this.data.imgList
           })
         }
       }
     })
   },
   handleNotebookSelected(e){
   	
   	  this.setData({
   	       noteBookRadio: e.target.dataset.id,
   	     });
   },
   handleSendComment(e){
	   
	   let reqData={
	      		  comment,
	      		  content
	   }
	   let that=this;
	   api._fetch({
	       url: '/api/i/reply/create',
	       data:reqData,
	       method:'post',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let postBookInfo=wx.getStorageSync("postBookInfo");
	console.log("postBookInfo is =",postBookInfo)
	if(postBookInfo){
		this.setData({
			postBookInfo
		});
	}
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