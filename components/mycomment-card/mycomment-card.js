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
	  handleCommentDetail:function(e){
		  console.log(e);
		  let itemIndex=e.target.dataset.itemindex;
		  var myEventDetail = {itemIndex} // detail对象，提供给事件监听函数
		        var myEventOption = {} // 触发事件的选项
		  this.triggerEvent('onCommentDetail', myEventDetail, myEventOption)
	  },
	  toShowReplyPage:function(e){
		  let id=e.target.dataset.id;
		  let item=e.target.dataset.item;
		  var myEventDetail = {id,item} // detail对象，提供给事件监听函数
		        var myEventOption = {} // 触发事件的选项
		  this.triggerEvent('onCommentReply', myEventDetail, myEventOption)
	  },
	onHandleLikeTrigger:function(e){
		
		let id=e.target.dataset.id;
		let liked=e.target.dataset.liked;
		var myEventDetail = {id,liked} // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onLikeEvent', myEventDetail, myEventOption)
	},
	toShowShareDialog:function(e){
		let title=e.target.dataset.title;
		let nickName=e.target.dataset.nickname;
		let bookName=e.target.dataset.bookname;
		let content=e.target.dataset.content;
		let target=e.target.dataset.target;
		
		var myEventDetail = {title,nickName,bookName,content,target}; // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onShareEvent', myEventDetail, myEventOption)
	},
	toShowForwardDialog:function(e){
		let target=e.target.dataset.target,
			item=e.target.dataset.item,
		    id=e.target.dataset.id;
			console.log(item);
		var myEventDetail = {target,id,item} // detail对象，提供给事件监听函数
		var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onForwardEvent', myEventDetail, myEventOption)
	},
	showModal:function(e){
		let id=e.target.dataset.id;
		let target=e.target.dataset.target;
		let noteDetail=e.target.dataset.item;
		wx.setStorageSync("noteDetail",noteDetail);
		var myEventDetail = {id,target} // detail对象，提供给事件监听函数
		      var myEventOption = {} // 触发事件的选项
		this.triggerEvent('onShowModal', myEventDetail, myEventOption)
	}
  }
})
