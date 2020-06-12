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
		handleBookDetail:function(e){
			
			
			      var myEventDetail = {
					  id:e.target.dataset.id,
					  itemIndex:e.target.dataset.itemindex
				  } // detail对象，提供给事件监听函数
			      var myEventOption = {} // 触发事件的选项
			 this.triggerEvent('commentdetail', myEventDetail, myEventOption)
		}
		
	}
})