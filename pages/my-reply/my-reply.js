// pages/my-reply/my-reply.js
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
	    successInfo:{},
	    deleteId:0,
		replyInfo:{
			num:6,
			list:[]
		},
		modalName:"",
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
			confirmDelete:false
  },
  
  showModal(e) {
	   let deleteId=e.target.dataset.id;
    this.setData({
      modalName: e.currentTarget.dataset.target,
	  deleteId
    })
	
  },
  handleBookDetail:function(e){
  		let id=e.target.dataset.id;
  		let itemIndex=e.target.dataset.itemindex;
  		wx.navigateTo({
  		  url: '../bookCommentDetail/bookCommentDetail?itemindex='+itemIndex+'&id='+id
  		})
  	 
  },
  handleAboutOther(e){
	  let id=e.target.dataset.id;
	  wx.navigateTo({
	    url: '../aboutOther/aboutOther?id='+id
	  })
  },
  handleCloseDialog(e){
  	  // let modalName=e.detail.modalName;
  	  this.setData({
  	    modalName:null
  	  })
  },
hideModal(e) {
    this.setData({
      modalName: null,
	   confirmDelete: false
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
   * @description 确认删除评论
   *  
   * */
confirmDelete(){
	this.setData({
	  confirmDelete: true
	})
	
},
toDeleteConfirm(){
	console.log("to delete comment");
	this.setData({
	  modalName: null,
	   confirmDelete: false
	})
	let deleteId=this.data.deleteId;
	this.deleteCommentReply(deleteId);
},
toShowShareDialog(e){
	
	let successInfo={},
		posterConfig=this.data.posterConfig;
		successInfo['nickName']=e.currentTarget.dataset.nickname;
		successInfo['bookName']=e.currentTarget.dataset.bookname;
		successInfo['content']=e.currentTarget.dataset.content;
		if(successInfo){
			posterConfig.texts[3].text="《"+successInfo.bookName+"》"+"的读书笔记";
			posterConfig.texts[4].text=successInfo.content;
			posterConfig.texts[5].text[1].text=successInfo.nickName;
		}
	this.setData({
	  modalName: e.currentTarget.dataset.target,
	  posterConfig,
	  successInfo
	})
},
imageLoad(e){
	
},
imageError(e){
	
},
handleColseShareDialog(){
	this.setData({
	  modalName: null,
	  
	})
},
/**
 * @description  获取回复列表
 * */
getReplyList(page,size){
	let that=this;
	let reqData={
			  page,
			  size
	}
	api._fetch({
	    url: '/api/i/commentReply/list',
	    data:reqData,
	    method:'get',
		contentType: 1
	}).then(function (res) {
		let replyInfo=res.data;
		let totalPages=res.data.totalPages;
		let totalElements=res.data.totalElements;
		that.setData({
			replyInfo,
			totalElements,
			totalPages
		});
		wx.hideLoading();
	   
	}).catch(function (error) {
	    console.log(error);
	});
},
/**
 * @description  删除回复列表
 * */
 deleteCommentReply(id){
	 let that=this;
	let reqData={
			  id
	}
	api._fetch({
	    url: '/api/i/commentReply/delete',
	    data:reqData,
	    method:'post',
		contentType: 1
	}).then(function (res) {
	   wx.showToast({
	     title: "删除成功",
	     mask:true,
	     icon: 'success',
	     duration: 3000
	   })
	   let page=that.data.currentPage;
	    let pageSize=that.data.pageSize;
	   that.getReplyList(page,pageSize);
	}).catch(function (error) {
	    console.log(error);
	});
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let that=this;
	 wx.showShareMenu({
		  // 要求小程序返回分享目标信息
		  withShareTicket: true
		}); 
		let page=that.data.currentPage;
		 let pageSize=that.data.pageSize;
		this.getReplyList(page,pageSize);
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
 		this.getReplyList(page,pageSize);
 	}
 	
 
 },
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
	  let that=this;
	 if (ops.from === 'button') {
	      // 来自页面内转发按钮
	      console.log(ops.target)
	    }
		this.setData({
		  modalName: null,
		  
		})
	    return {
	      title: '我的回复',
	      path: `pages/my-reply/my-reply`,
	    }
		
		
  }
})