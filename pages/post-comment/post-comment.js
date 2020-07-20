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
	realImageList:[],
	images:"",
	notebook:"我的笔记本",
	note:false,
	showNoteList:false,
  },
   
   handlNoteTitleInput:function(e){
   	  let len=e.detail.value.length;
   	  this.setData({
   	    noteTitleLen:len,
   		noteTitle:e.detail.value
   	  });
   },
   /**
    * @description:处理输入中的书评详细；
    * */
   	 handlNoteInput(e){
   		  let len=e.detail.value.length;
   		  this.setData({
   			notesLen:len,
   			notes:e.detail.value
   		  });
   	  },
   
   ChooseImage() {
	   let that=this;
     wx.chooseImage({
       count: 4, //默认9
       sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
       sourceType: ['album'], //从相册选择
       success: (res) => {
		   console.log(res);
         if (this.data.imgList.length != 0) {
           this.setData({
             imgList: this.data.imgList.concat(res.tempFilePaths)
           })
		   
         } else {
           this.setData({
             imgList: res.tempFilePaths
           })
         }
		 // 获取token并设置请求头
		 let token = wx.getStorageSync('userToken')
		 let header={
			  'content-type':'application/x-www-form-urlencoded',
		 };
		 if(token){
			 header['token']=token;
		 }
		  
		  wx.uploadFile({
		       url: 'https://mpapi.bookreview.com.cn/book/api/upload', //仅为示例，非真实的接口地址
		       filePath: res.tempFilePaths[0],
		       name: 'file',
		       header:header,
		       success (res){
		         
			     let data=res.data;
				let realImageList=that.data.realImageList.slice(0);
				realImageList.push(JSON.parse(data).url);

				that.setData({
					realImageList
				});
		         //do something
		       }
		     })
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
     content: '确定要删除这张图片吗？',
     cancelText: '取消',
     confirmText: '删除',
       success: res => {
         if (res.confirm) {
          
          let imgList=this.data.imgList.slice(0);
          
              imgList.splice(e.currentTarget.dataset.index, 1);
          			   
          let realImageList=this.data.realImageList;
          			   realImageList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
                imgList,
          		realImageList
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
	    let that=this;
	   let notesLen=this.data.notesLen;
	   if(notesLen==0){
	   		  wx.showToast({
	   		    title: '书评内容不可为空哦',
	   		    mask:false,
	   		    icon: 'none',
	   		    duration: 3000
	   		  })
	   }else{
		   let postBookInfo=this.data.postBookInfo;
		   let userInfo=wx.getStorageSync('userInfo');
		   let content=this.data.notes,
		       note=this.data.note,
		   		   noteTitle=this.data.noteTitle,
		   		   notebook=this.data.noteBookRadio;
		   		 
		   let reqData={
		   		    book:postBookInfo.id,
		   		    content,
		   			note,
		   			notebook
		      		 
		   }
		   if(noteTitle.length>0){
		   			 reqData['title']=that.data.noteTitle;
		   }
		   let realImageList=this.data.realImageList;
		   		
		   if(realImageList.length>0){
		   			    let images="",len=realImageList.length;
		   				if(len>1){
		   					for(let i=0;i<len;i++){
		   						images+=realImageList[i]+";"
		   					}
		   				}else{
		   					images=realImageList[0];
		   				}
		   				
		   			    reqData['images']=images
		   }
		   
		   	  
		   api._fetch({
		       url: '/api/i/comment/create.more',
		       data:reqData,
		       method:'post',
			   contentType:1
		   }).then(function (res) {
		      	 
		   			 // 此处发送修改交易；
		   			 if(res.statusCode===200){
						 
						let successInfo={
							
							 bookName:that.data.postBookInfo.name,
							 book:that.data.postBookInfo.id,
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
							 url:'../forward-success/forward-success?type=postcomment'
						});
		  
		   			 }else{
		   				 wx.showToast({
		   				   title: res.message,
		   				   mask:false,
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
   	   				   mask:false,
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