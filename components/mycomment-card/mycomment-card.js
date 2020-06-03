// components/mycomment-card/mycomment-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	item:{
			type:Object,
			value:{}
		},
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
	onHandleLikeTrigger:function(e){
		
		let index=e.target.dataset.index;
		var myEventDetail = {index} // detail对象，提供给事件监听函数
		      var myEventOption = {key:"like"} // 触发事件的选项
		this.triggerEvent('onLikeEvent', myEventDetail, myEventOption)
	}
  }
})
