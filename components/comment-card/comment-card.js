Component({
	/**
	 * 组件的属性列表
	 */
	properties:{
		
		cardInfo:{
			type:Object,
			value:{}
		},
		starMax:{
			type:Number,
			value:5
		},
		readMore:{
			type:Boolean,
			value:true
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
		handleLoadmore:function(e){
			
			let cardInfo=e.target.dataset.resume;
			let itemIndex=e.target.dataset.itemindex
			cardInfo[itemIndex].readMore=!cardInfo[itemIndex].readMore
		
			this.setData({
				cardInfo:cardInfo
			});
			
		},
		handleBookDetail:function(e){
			
		}
		
	}
})