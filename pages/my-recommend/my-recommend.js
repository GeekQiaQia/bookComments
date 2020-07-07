// pages/my-recommend/my-recommend.js
const app = getApp()
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
	  
	  movieCurrentPage:0,
	  movieTotalPages:0,
	  movieTotalElements:0,
	  moviePageSize:10,
	  
	  bookInfo:null,
	  movieInfo:null,
	recommendInfo:{
		bookNum:3,
		videoNum:0,
		recommendDetail:
			{
				recommendBookList:[],
				recommendVideoList:[
				{
					videoType:"影片",
					videoList:[]
				},
					
				],
			}
		
	}
  },
  /**
   * @description  获取书籍推荐列表
   * */
  getbookList(page=0,size=10){
  	let that=this;
  	let reqData={
  			  page,
  			  size
  	}
  	api._fetch({
  	    url: '/api/i/recommend/book.list',
  	    data:reqData,
  	    method:'get',
  		contentType: 1
  	}).then(function (res) {
		 let recommendInfo=that.data.recommendInfo;
  		 let bookInfo=res.data;
  		 let totalPages=res.data.totalPages;
  		 let totalElements=res.data.totalElements;
		 recommendInfo.bookNum=bookInfo.content.length;
		 
		 let typeMap=new Map();
		
				let content=bookInfo.content;
				for(let i=0;i<content.length;i++){
					let bookType=content[i].category.name;
					if(!typeMap.has(bookType)){
						typeMap.set(bookType,i);
						let catInfo={
								bookType:"",
								bookList:[]
										};
						catInfo['bookType']=bookType;
						catInfo['bookList']=[];
						let result=content.filter(item=>{
							return item.category.name==bookType;
						});
						catInfo.bookList=result;
						console.log('catInfo is:',catInfo);
						recommendInfo.recommendDetail.recommendBookList.push(catInfo);
					}
					
				}
				console.log(recommendInfo.recommendDetail.recommendBookList);

				
		 
  		that.setData({
			recommendInfo,
  			bookInfo,
  			totalElements,
  			totalPages
  		});
  		wx.hideLoading();
  	   
  	}).catch(function (error) {
  	    console.log(error);
  	});
  },
  /**
   * @description  获取电影推荐列表
   * */
  getMovieList(page=0,size=10){
  	let that=this;
  	let reqData={
  			  page,
  			  size
  	}
  	api._fetch({
  	    url: '/api/i/recommend/movie.list',
  	    data:reqData,
  	    method:'get',
  		contentType: 1
  	}).then(function (res) {
		let recommendInfo=that.data.recommendInfo;
  		let movieInfo=res.data;
  		let movieTotalPages=res.data.totalPages;
  		let movieTotalElements=res.data.totalElements;
		console.log(movieInfo);
		recommendInfo.videoNum=movieInfo.content.length;
				
						let content=movieInfo.content;
						for(let i=0;i<content.length;i++){
							recommendInfo.recommendDetail.recommendVideoList[0].videoList.push(content[i]);
							
							
						}
  		that.setData({
			recommendInfo,
  			movieInfo,
  			movieTotalPages,
  			movieTotalElements
  		});
  		wx.hideLoading();
  	   
  	}).catch(function (error) {
  	    console.log(error);
  	});
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.getbookList();
	this.getMovieList();
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