// components/share-friends/share-friends.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	modalName:{
				type:String,
				value:null
			},
			posterConfig:{
				type:Object,
				value:null
			},
			shareInfo:{
				type:Object,
				value:null
			},
	shareFriends:{
		type:Boolean,
		value:false
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
  methods: {
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
	 handleColseShareDialog(){
		 var myEventDetail = {
		   			   modalName: null,
		   		  } // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		 this.triggerEvent('closeDialog', myEventDetail, myEventOption)
		
	 },
	 saveDrawedCanvas(e){
		 var myEventDetail = {
		   			   
		   		  } // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		 this.triggerEvent('drawCanvas', myEventDetail, myEventOption)
		
	
	 },
	
  }
})
