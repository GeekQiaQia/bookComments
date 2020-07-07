// pages/post-comment/post-comment.js
const api = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  type:"",
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
	note:null,

	showNoteList:false,
  },
  /**
   * @description  我的书评，添加为笔记本；
   * */
   handleAddToNotes:function(e){
	   let that=this;
	   let notesLen=this.data.notesLen;
	   if(notesLen==0){
	   		  wx.showToast({
	   		    title: '笔记内容不可为空哦',
	   		    mask:true,
	   		    icon: 'none',
	   		    duration: 3000
	   		  })
	   }else{
	   		   let postBookInfo=this.data.postBookInfo;
	   		   let userInfo=wx.getStorageSync('userInfo');
	   		   let content=this.data.notes,
	   		   	   noteTitle=this.data.noteTitle,
	   			   comment=this.data.note,
	   		   	   notebook=this.data.noteBookRadio;
	   		   		 
	   		   let reqData={
	   		   		    
	   		   			comment,
						content,
						note:true,
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
	   		       url: '/api/i/comment/forward',
	   		       data:reqData,
	   		       method:'post',
	   			   contentType:1
	   		   }).then(function (res) {
	   		      	 
	   		   			 // 此处发送修改交易；
	   		   			 if(res.statusCode===200){
	   						
	   						wx.navigateBack({
	   							delta:1,
	   						})
	   		  
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
			  notes:e.detail.value,
			  notesLen:len
   		  });
   	  },
   
   ChooseImage() {
	   let that=this;
     wx.chooseImage({
       count: 3, //默认9
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
   /**
	* @description  转发笔记
	* */
   handleForwardComment(e){
	   let that=this;
	   let notesLen=this.data.notesLen;
	   if(notesLen==0){
	   		  wx.showToast({
	   		    title: '笔记内容不可为空哦',
	   		    mask:false,
	   		    icon: 'none',
	   		    duration: 3000
	   		  })
	   }else{
	   		   let postBookInfo=this.data.postBookInfo;
	   		   let userInfo=wx.getStorageSync('userInfo');
	   		   let content=this.data.notes,
	   		   	   noteTitle=this.data.noteTitle,
	   			   noteId=this.data.note;
	   		   		 
	   		   let reqData={
	   		   		    content,
	   		   			noteId
	   		      		 
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
	   		       url: '/api/i/note/forwarding',
	   		       data:reqData,
	   		       method:'post',
	   			   contentType:1
	   		   }).then(function (res) {
	   		      	 
	   		   			 // 此处发送修改交易；
	   		   			 if(res.statusCode===200){
	   						//  // 返回到上个页面
	   						let pages=getCurrentPages();
	   						
	   						let beforePage=pages[pages.length-2];
	   						
	   						beforePage.getNoteDetail(noteId);
	   						wx.navigateBack({
	   							delta:1,
	   						})
	   		  
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
   handleSendComment(e){
	    let that=this;
	   let notesLen=this.data.notesLen;
	   if(notesLen==0){
	   		  wx.showToast({
	   		    title: '笔记内容不可为空哦',
	   		    mask:false,
	   		    icon: 'none',
	   		    duration: 3000
	   		  })
	   }else{
		   let postBookInfo=this.data.postBookInfo;
		   let userInfo=wx.getStorageSync('userInfo');
		   let content=this.data.notes,
		   	   noteTitle=this.data.noteTitle,
			   note=this.data.note,
		   	   noteBook=this.data.noteBookRadio;
		   		 
		   let reqData={
		   		    content,
		   			note,
		   			noteBook
		      		 
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
		       url: '/api/i/note/edit',
		       data:reqData,
		       method:'post',
			   contentType:1
		   }).then(function (res) {
		      	 
		   			 // 此处发送修改交易；
		   			 if(res.statusCode===200){
						//  // 返回到上个页面
						let pages=getCurrentPages();
						
						let beforePage=pages[pages.length-2];
						
						beforePage.getNoteDetail(note);
						wx.navigateBack({
							delta:1,
						})
		  
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
	let type=options.type;
	let notebook=null;
	let noteBookRadio=null;
	let postBookInfo=null;
	console.log(options);
	if(type=="forward"){
		wx.setNavigationBarTitle({
			title:"转发读书笔记"
		})
		this.setData({
			type:"forward"
		});
	}else if(type=='add'){
		wx.setNavigationBarTitle({
			title:"我的书评-添加到笔记"
		})
		this.setData({
			type:"add"
		});
	}
	this.getNotebookList();
	
	let noteDetail=wx.getStorageSync("noteDetail");
	let noteTitle=noteDetail.title;
	let noteTitleLen=0
	if(noteTitle==null||noteTitle==''){
		noteTitleLen=0
	}else{
		noteTitleLen=noteTitle.length;
	}
	if(type=='add'){
		notebook="我的笔记本";
		noteBookRadio=0;
		postBookInfo=noteDetail.bookInfo;
	}else{
		 notebook=noteDetail.userNotebook.name;
		 noteBookRadio=noteDetail.userNotebook.id;
		 postBookInfo=noteDetail.book;
	}

	let note=noteDetail.id;
	let images=noteDetail.images;
	
	if(noteDetail){
		this.setData({
			postBookInfo,
			notes:noteDetail.content,
			notesLen:noteDetail.content.length,
			noteTitle,
			noteTitleLen,
			notebook,
			note,
			noteBookRadio,
			realImageList:images,
			imgList:images
			
		});
	}
	
	
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