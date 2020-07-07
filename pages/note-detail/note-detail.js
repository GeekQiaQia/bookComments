// pages/note-detail/note-detail.js
const api = require('../../utils/request.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	scrollHeight:"",
	noteId:"",
	noteDetail:{},
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
  	this.setData({
  	  modalName: e.currentTarget.dataset.target,
  	  posterConfig,
  	  successInfo
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
  
  handleForwardNote:function(e){
	  
	  wx.setStorageSync("noteDetail",this.data.noteDetail)
	  wx.navigateTo({
	    url: '../edit-note/edit-note?type=forward',
	  }) 
  },
  /**
   * @description 编辑读书笔记； 
   * 
   * */
   handleEditNote:function(e){
	   wx.setStorageSync("noteDetail",this.data.noteDetail)
	   wx.navigateTo({
	     url: '../edit-note/edit-note',
	   }) 
   },
  /**
   *动态计算scrollview 高度；
   *  
   * 
  */
  computeScrollViewHeight:function(){
    // 获取到的单位px;
    let width=wx.getSystemInfoSync().windowWidth;
    let height=wx.getSystemInfoSync().windowHeight;
   
    // rpx与px 之间的换算：750rpx /windowWidth=屏幕高度rpx/windowHeight;
    let screeHeight=750*height/width;
  
    // 设置出其余view的高度； swiperHeight=420rpx;tabBarHeight=139rpx
    let scroll_height=screeHeight-166;
    
    this.setData({
      scrollHeight:scroll_height
    });
  },
  getNoteDetail:function(id){
	  let reqData={
	  		 id
	  }
	  let that=this;
	  api._fetch({
	      url: '/api/i/note/detail',
	      data:reqData,
	      method:'get',
	  	contentType:1
	  }).then(function (res) {
	  
	  			 // 此处发送修改交易；
	  			 if(res.statusCode===200){
					 let noteDetail=res.data;
					 let name=noteDetail.userNotebook.name;
				 wx.setNavigationBarTitle({
					  title: name+"读书笔记"
					})
					that.setData({
						noteDetail
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log("into onLoad");
	  
	  let noteId=options.noteId;
	  this.setData({
		  noteId
	  });
	  this.getNoteDetail(noteId);
	  this.computeScrollViewHeight();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
	console.log("into onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  console.log("into onShow");
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