// components/book-card/book-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	bookInfo:{
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
	  /**
	   * @description  查询作者详细信息；
	   * */
	handleAuthorDetail(e){
		
		
		      var myEventDetail = {
				  id:e.target.dataset.id
			  } // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		 this.triggerEvent('onAuthorDetail', myEventDetail, myEventOption)
	},
	/**
	 * @description  查询出版社详细信息；
	 * */
	handlePressDetail(e){
		   
		     var myEventDetail = {
						  id:e.target.dataset.id
					  } // detail对象，提供给事件监听函数
		     var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onPressDetail', myEventDetail, myEventOption)
	},
	/**
	 * @description  查询书籍详细信息；
	 * */
	handleBookDetail(e){
		   
		     var myEventDetail = {
						  id:e.target.dataset.id
					  } // detail对象，提供给事件监听函数
		     var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onBookDetail', myEventDetail, myEventOption)
	},
	
  }
})
