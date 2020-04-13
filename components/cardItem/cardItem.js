Component({
	properties:{
		// 定义组件属性
		cardInfo:{
			type:Array,
			value:[]
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