// components/bottom-input/bottom-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
	handleOnFocus:function(e){
		
		let hasAuthed=wx.getStorageSync('hasAuthed');
		if(!hasAuthed){
			// 提示需要获取权限设置；
			wx.showModal({
				title:'提示：您尚未授权',
				confirmText:'授权登录',
				showCancel:true,
				content:'授权后，您将获得更多精彩功能',
				success:function(res){
					console.log(res);
					if(res.cancel){
						wx.setStorageSync('hasAuthed',false )
						return;
					}else if(res.confirm){
						wx.switchTab({
						  url: '../aboutMe/aboutMe'
						})
					}
					
				},
				fail:function(err){
					console.log(err);
				}
			})
		}else{
			
			var myEventDetail = {
							  
						  } // detail对象，提供给事件监听函数
			     var myEventOption = {} // 触发事件的选项
			this.triggerEvent('onFocus', myEventDetail, myEventOption)
		}
	
	
	}
  }
})
