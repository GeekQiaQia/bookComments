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
	allEvaluationSize:0,
	commntsSize:0,
	previewImage:"",
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
                text: "「知论",
                fontSize: 34,
                color: '#F7F7F7',
            },
            {
                x: 276,
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
			    text: "他不是心灵鸡汤",
			    fontSize: 28,
			    color: '#ffffff',
			},
			{
			    x: 184,
			    y: 216,
			    baseLine: 'middle',
			    text: "《一个人的朝圣》的读书笔记",
			    fontSize: 20,
			    color: '#eeeeee',
			},
			
            {
                x: 184,
                y: 288,
                fontSize: 24,
                baseLine: 'middle',
                text: "很多时候我们被很多東西束缚住了，就像那句话讲的一樣:如果你不出去走走，你就会以为這是全世界。一个人的生命历程就像是朝圣之路一樣，要虔诚的走，走的时候，别太急，别忘了生命中的感动与祝福。人生路漫漫，孤独必然存在，記得积极面对吶~拙见，不喜勿喷本书推荐阅读。",
                width: 382,
                lineNum: 8,
				fontWeight:400,
				lineHeight:36,
                color: '#666666',
                zIndex: 200,
            },
            {
                x: 442,
                y: 606,
                baseLine: 'middle',
                text: [
                    {
                        text: '—— ',
                        fontSize: 24,
                        color: '#666666',
                    },
                    {
                        text: '夏之风',
                        fontSize: 24,
                        color: '#666666',
                        marginRight: 32,
						marginLeft: 2,
                    }
                ]
            },
            {
                x: 324,
                y: 686,
                baseLine: 'middle',
                text: '长按小程序查看详情',
				fontWeight:400,
				lineHeight:34,
                fontSize: 24,
                color: '#969696',
            },
			{
			    x: 324,
			    y: 720,
			    baseLine: 'middle',
			    text: '分享自',
				fontWeight:400,
				lineHeight:34,
			    fontSize: 24,
			    color: '#969696',
			},
			{
			    x: 396,
			    y: 720,
			    baseLine: 'middle',
			    text: '「知论」',
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
			    x: 212,
			    y: 658,
			    borderRadius: 20,
			    url: "../../images/qrcode.png",
			},
       
        ]

    },
	modalName:null
  },
  

  toPx(rpx) {	// px转rpx
  const sysInfo = wx.getSystemInfoSync();
  const screenWidth = sysInfo.screenWidth;
  let factor = screenWidth / 750;	// 获取比例
  	return rpx*factor;
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

  
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	let allEvaluationSize=this.toPx(28);
	let commntsSize=this.toPx(24);
	this.setData({
		allEvaluationSize,
		commntsSize
	});
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