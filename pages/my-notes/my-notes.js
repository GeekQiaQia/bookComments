// pages/my-notes/my-notes.js
const api = require('../../utils/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  currentPage:0,
	  totalPages:0,
	  totalElements:0,
	  pageSize:10,
	  modalName:null,
	  deleteId:null,
	  confirmDelete:false,
	  notesInfo:{},
	  notesList:{},
	  successInfo:{},
	  posterConfig: {
	  	    width: 750,
	  	    height: 982,
	  	    backgroundColor: '#fff',
	  	    debug: false,
	  	    pixelRatio: 1,
	  	    blocks: [
	  	        {
	  	            width: 448,
	  	            height: 736,
	  	            x: 152,
	  	            y: 64,
	  	            borderWidth: 2,
	  	            borderColor: '#595959',
	  	            borderRadius: 20,
	  	        },
	  	        {
	  	            width: 634,
	  	            height: 74,
	  	            x: 59,
	  	            y: 770,
	  	            backgroundColor: '#fff',
	  	            opacity: 0.5,
	  	            zIndex: 100,
	  	        },
	  	    ],
	  	    texts: [
	  	        {
	  	            x: 162,
	  	            y:112,
	  	            baseLine: 'middle',
	  	            text: "「米读书评",
	  	            fontSize: 34,
	  	            color: '#F7F7F7',
	  	        },
	  	        {
	  	            x: 344,
	  	            y: 118,
	  	            baseLine: 'middle',
	  	            text: "随笔",
	  	            fontSize: 24,
	  	            color: '#ffffff',
	  	        },
	  			{
	  			    x: 184,
	  			    y: 180,
	  			    baseLine: 'middle',
	  			    text: "",
	  			    fontSize: 28,
	  			    color: '#ffffff',
	  			},
	  			{
	  			    x: 184,
	  			    y: 216,
	  			    baseLine: 'middle',
	  			    text: "",
	  			    fontSize: 20,
	  			    color: '#eeeeee',
	  			},
	  			
	  	        {
	  	            x: 184,
	  	            y: 288,
	  	            fontSize: 24,
	  	            baseLine: 'middle',
	  	            text: "",
	  	            width: 382,
	  	            lineNum: 8,
	  				fontWeight:400,
	  				lineHeight:36,
	  	            color: '#666666',
	  	            zIndex: 200,
	  	        },
	  	        {
	  	            x: 380,
	  	            y: 606,
	  	            baseLine: 'middle',
	  	            text: [
	  	                {
	  	                    text: '—— ',
	  	                    fontSize: 24,
	  	                    color: '#666666',
	  	                },
	  	                {
	  	                    text: '',
	  	                    fontSize: 24,
	  						width: 100,
	  	                    color: '#666666',
	  	                    marginRight: 32,
	  						marginLeft: 2,
	  	                }
	  	            ]
	  	        },
	  	        {
	  	            x: 344,
	  	            y: 686,
	  	            baseLine: 'middle',
	  	            text: '长按小程序查看详情',
	  				fontWeight:400,
	  				lineHeight:34,
	  	            fontSize: 24,
	  	            color: '#969696',
	  	        },
	  			{
	  			    x: 344,
	  			    y: 720,
	  			    baseLine: 'middle',
	  			    text: '分享自',
	  				fontWeight:400,
	  				lineHeight:34,
	  			    fontSize: 24,
	  			    color: '#969696',
	  			},
	  			{
	  			    x: 416,
	  			    y: 720,
	  			    baseLine: 'middle',
	  			    text: '「米读书评」',
	  				fontWeight:"bold",
	  				lineHeight:34,
	  			    fontSize: 24,
	  			    color: '#666666',
	  			},
	  	     
	  	    ],
	  	    images: [
	  	        {
	  	            width: 448,
	  	            height: 192,
	  	            x: 152,
	  	            y: 64,
	  	            borderRadius: 20,
	  	            url: "../../images/bookbg.png",
	  	        },
	  			{
	  			    width:96,
	  			    height: 96,
	  			    x: 232,
	  			    y: 658,
	  			    borderRadius: 20,
	  			    url: "../../images/qrcode.png",
	  			},
	  	   
	  	    ]
	  	
	  	},
	  
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
   handleShowModal(e){
	  let deleteId=e.target.dataset.id;
	  let target=e.target.dataset.target;
   	this.setData({
   		modalName:target,
   		deleteId
   	});
   },
   hideModal(e) {
       this.setData({
         modalName: null,
   	   confirmDelete: false
       })
     },
  /**
     * @description 确认删除评论
     *  
     * */
  confirmDelete(){
  	this.setData({
  	  confirmDelete: true
  	})
  	
  },
  /**
   * @description 确认删除评论；
   *  
   * */
  toDeleteConfirm(){
  	console.log("to delete comment");
  	this.setData({
  	  modalName: null,
  	   confirmDelete: false
  	})
  	let deleteId=this.data.deleteId;
  	this.deleteNoteList(deleteId);
  },
  /**
   * @description  删除笔记列表
   * */
   deleteNoteList(id){
  	 let that=this;
  	let reqData={
  			  id
  	}
  	api._fetch({
  	    url: '/api/i/note/delete',
  	    data:reqData,
  	    method:'get',
  		contentType: 1
  	}).then(function (res) {
  	   wx.showToast({
  	     title: "删除成功",
  	     mask:false,
  	     icon: 'success',
  	     duration: 3000
  	   })
  	   let page=that.data.currentPage;
  	    let pageSize=that.data.pageSize;
  	   that.handleGetNoteList(page,pageSize);
  	}).catch(function (error) {
  	    console.log(error);
  	});
   },
   handleNoteDetail:function(e){
	   let noteId=e.target.dataset.id;
	   wx.navigateTo({
	     url: '../note-detail/note-detail?noteId='+noteId
	   })
   },
   handleBookDetail:function(e){
		let id=e.target.dataset.id;
		let itemIndex=e.target.dataset.itemindex;
		wx.navigateTo({
		  url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemIndex+'&id='+id
		})
   	 
   },
   /**
	* @description editNotes
	* */
	editNotes:function(e){
		let noteId=this.data.deleteId;
		wx.navigateTo({
		  url: '../note-detail/note-detail?noteId='+noteId
		})
	},
	moveNoteBooks:function(e){
		let noteId=this.data.deleteId;
		wx.navigateTo({
		  url: '../move-notebook/move-notebook?noteId='+noteId
		})
	},
  /*
  *
   * @description 跳转到查看笔记本
   * */
   handleReviewNotebooks:function(e){
	   wx.navigateTo({
	     url: '../my-notebooks/my-notebooks'
	   })
   },
   /**
    * @description  显示分享页面
    * **/
   toShowShareDialog(e){
   	let nickName=app.globalData.userInfo.nickName;
   	let successInfo={},
   		posterConfig=this.data.posterConfig;
   		successInfo['nickName']=nickName;
   		successInfo['title']=e.currentTarget.dataset.title;
   		successInfo['bookName']=e.currentTarget.dataset.bookname;
   		successInfo['content']=e.currentTarget.dataset.content;
   		if(successInfo){
   			if(successInfo['title']!==null){
   				posterConfig.texts[2].text=successInfo['title'];
   			}
   			posterConfig.texts[3].text="《"+successInfo.bookName+"》"+"的读书笔记";
   			posterConfig.texts[4].text=successInfo.content;
   			posterConfig.texts[5].text[1].text=successInfo.nickName;
   		}
		console.log("into");
   	this.setData({
   	  modalName: e.currentTarget.dataset.target,
   	  posterConfig,
   	  successInfo
   	})
   },
   
   handleForwardNote:function(e){
	   let noteDetail=e.target.dataset.item;
	      
   	  wx.setStorageSync("noteDetail",noteDetail)
   	  wx.navigateTo({
   	    url: '../edit-note/edit-note?type=forward',
   	  }) 
   },
   
   handleCloseDialog(e){
   	  // let modalName=e.detail.modalName;
   	  this.setData({
   	    modalName:null
   	  })
   },
   onPosterSuccess(e) {
          const { detail } = e;
          wx.previewImage({
              current: detail,
              urls: [detail]
          })
      },
      onPosterFail(err) {
          console.error(err);
      },
   
   /**
	* @description 获取笔记列表；
	* */
	handleGetNoteList:function(page=0,size=10){
		let reqData={
				   page,
				   size
		}
		let that=this;
		api._fetch({
		    url: '/api/i/note/list',
		    data:reqData,
		    method:'get',
			contentType:1
		}).then(function (res) {
		
					 // 此处发送修改交易；
					 if(res.statusCode===200){
						 
						 let notesList=res.data;
						 let totalPages=res.data.totalPages;
						 let totalElements=res.data.totalElements;
						 that.setData({
						 	notesList,
						 	totalElements,
						 	totalPages
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
	console.log("into onShow");
	this.handleGetNoteList();
	this.hideModal();
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
 onReachBottom: function() {
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
 		this.handleGetNoteList(page,pageSize);
 	}
 	
 
 },

  /**
   * 用户点击右上角分享
   */
  onShareAppnotes: function () {

  }
})