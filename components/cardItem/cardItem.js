Component({
	/**
	 * 组件的属性列表
	 */
	properties:{
		
		cardInfo:{
			type:Object,
			value:{}
		}
		
	},
	/**
	 * 组件的初始数据
	 */
	data: {
	
	},
	
	/**
	 * 组件的方法列表
	 */
	methods:{
		imageLoad:()=>{
			
		},
		imageError:()=>{
			
		},
		getHeight:()=>{
			let query = wx.createSelectorQuery();
			    let that = this
			    query.select('#meat').boundingClientRect(rect => {
			      let clientHeight = rect.height;
			      let clientWidth = rect.width;
			      let ratio = 350 / clientWidth;
			      that.data.height1 = clientHeight * ratio;
			    }).exec();
		},
		/**
		 * @description:readMore
		 * */
		handleLoadmore:function(e){
			
			let cardInfo=e.target.dataset.resume;
			
			cardInfo.readMore=!cardInfo.readMore
		
			this.setData({
				cardInfo:cardInfo
			});
			
		},
		handleCommentDetail:function(e){
			
			
			      var myEventDetail = {
					  id:e.target.dataset.id,
					  itemIndex:e.target.dataset.itemindex
				  } // detail对象，提供给事件监听函数
			      var myEventOption = {} // 触发事件的选项
			 this.triggerEvent('commentdetail', myEventDetail, myEventOption)
		},
		handleBookDetail:function(e){
			console.log(e)
			      var myEventDetail = {
					  id:e.target.dataset.id,
					  
				  } // detail对象，提供给事件监听函数
			      var myEventOption = {} // 触发事件的选项
			 this.triggerEvent('bookdetail', myEventDetail, myEventOption)
		}
		
	}
})