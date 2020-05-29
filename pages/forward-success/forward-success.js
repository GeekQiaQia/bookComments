// pages/forward-success/forward-success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	allEvaluation:0,
	showCanvas:false,
	paperEvaluation:0,
	deepEvaluation:0,
	easyEvaluation:0,
	professionalEvaluation:0,
	shareFriends:false,
	previewImage:"",
	modalName:null
  },
  onAllEvaluationChange(event){
	   this.setData({
	        allEvaluation: event.detail,
	      });
  },
  onPaperEvaluationChange(event){
	  this.setData({
	       paperEvaluation: event.detail,
	     });
  },
  onEasyEvaluationChange(event){
	  this.setData({
	       easyEvaluation: event.detail,
	     });
  },
  onDeepEvaluationChange(event){
	  this.setData({
	       deepEvaluation: event.detail,
	     });
  },
  onProfessionalEvaluationChange(event){
	  this.setData({
	       professionalEvaluation: event.detail,
	     });
  },
  goNotebooks(e){
	  wx.redirectTo({
		  url:'../my-notes/my-notes'
	  })
  },
  toShareCircleFriend(e){
	
	this.setData({
	  modalName: e.currentTarget.dataset.target
	})
  },
  handleCloseDialog(e){
  	  let modalName=e.detail.modalName;
  	  this.setData({
  	    modalName,
		 showCanvas:false
  	  })
  },
  handleDrawCanvas(e){
	  this.setData({
		  showCanvas:true
	  },function(){
		  this.drawCanvas();
	  })
	  
  },
   drawCanvas() {
	   let that=this;
   		 let  ctx = wx.createCanvasContext('shareFrends')
   		 // // 使用 wx.createContext 获取绘图上下文 context
		  let mediaName="「知论",
			  mediaNameLen=ctx.measureText(mediaName).width,
		      tip="随笔",
			  tipLen=mediaNameLen+46,
			  title="他不是心灵鸡汤",
			  bookName="《一个人的朝圣》"+"的读书笔记"
   		  let bgTitle="../../images/bookbg.png";
		  let qrCode="../../images/qrcode.png";
		  let comments="很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对吶~拙见，不喜勿喷本书推荐阅读。"
		  let name="—— 夏之风",
		  nameLen=ctx.measureText(name).width,
			  qrTip="长按小程序查看详情",
			  qrFrom="分享自",
			  qrFromLen=ctx.measureText(qrFrom).width,
			  qrFromName="「知论」";
			  
		 
		 let titleWidth = 0, titleIndex = 0, titleTop = 122;
   		 ctx.drawImage(bgTitle, 0, 0, 224, 96);
		 
		 ctx.setFontSize(17);
		 ctx.setFillStyle('#F7F7F7');
		 ctx.fillText(mediaName, 8, 32);
		 
		 ctx.setFontSize(12);
		 ctx.setFillStyle('#ffffff');
		 ctx.fillText(tip, tipLen, 34);
		 
		 ctx.setFontSize(14);
		 ctx.setFillStyle('#ffffff');
		 ctx.fillText(title, 17, 62);
	      
		 
		 ctx.setFontSize(10);
		 ctx.setFillStyle('#eeeeee');
		 ctx.fillText(bookName, 15, 80);
		 
   		 ctx.setFontSize(12);
   		 ctx.setFillStyle('#666666');
		 
		 let len=comments.length
		 for (let i = 0; i < len; i++) {
			let wordWidth=ctx.measureText(comments[i]).width;
		   titleWidth += wordWidth;
		   if (titleWidth > 189) {
		     ctx.fillText(comments.substring(titleIndex, i), 16, titleTop);
		     titleTop += 20;
		     titleWidth = 0;
		     titleIndex = i;
		   }
		   if (i == comments.length - 1) {
		     ctx.fillText(comments.substring(titleIndex, i + 1), 16, titleTop);
		   }
		 }
		 let nameLeft=224-nameLen-32;
		 titleTop+=30;
		 ctx.fillText(name, nameLeft, titleTop);
		 
		 
		 ctx.drawImage(qrCode, 30, 310, 48, 48);
		 
		 ctx.setFontSize(12);
		 ctx.setFillStyle('#969696');
		 ctx.fillText(qrTip, 86, 330);
		 
		 ctx.setFontSize(12);
		 ctx.setFillStyle('#969696');
		 ctx.fillText(qrFrom, 86, 348);
		 
		 ctx.setFontSize(12);
		 ctx.setFillStyle('#666666');
		 let qrFromNameLeft=qrFromLen+88;
		 ctx.fillText(qrFromName, qrFromNameLeft, 348);
		 
   		 ctx.draw();
    setTimeout(function () {
      that.createImage();
    }, 500)
   
   },
   createImage: function () {
     let that = this;
     wx.canvasToTempFilePath({
       x: 0,
       y: 0,
       canvasId: 'shareFrends',
       success: function (res) {
         that.setData({
           previewImage: res.tempFilePath
         })
         wx.getSetting({
           success(res) {
             if (!res.authSetting['scope.writePhotosAlbum']) {
               wx.showModal({
                 title: '微信授权',
                 content: '保存海报需要授权保存到相册',
                 showCancel: false,
                 confirmText: '去授权',
                 showCancel: '取消',
                 confirmColor: '#72B9C3',
                 success: function (res) {
                   if (res.confirm) {
                     wx.authorize({
                       scope: 'scope.writePhotosAlbum',
                       success() {
                         that.saveImageToPhotos();
                       },
                       fail() {
                         wx.openSetting({})
                         that.setData({
                          
                           previewImage: ''
                         })
                       }
                     })
                   } else {
                     that.setData({
                       isShowWxacodeImage: false,
                       isShowShareModal: false,
                       previewImage: ''
                     })
                   }
                 }
               })
             } else {
               that.saveImageToPhotos();
             }
           }
         })   
       }
     });
   },
   saveImageToPhotos() {
     var that = this;
     wx.saveImageToPhotosAlbum({
       filePath: that.data.previewImage,
       success(res) {
         wx.showModal({
           title: '海报保存成功',
           content: '海报已成功保存至本地相册，接下来只需要去朋友圈发发发~',
           showCancel: false,
           confirmText: '好哒',
           confirmColor: '#72B9C3',
           success: function (res) {
             if (res.confirm) {
               that.setData({
                 showCanvas: false,
                 modalName: null,
                 previewImage: ''
               });
             }
           }
         })
       }
     })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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