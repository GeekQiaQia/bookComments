Component({
  data: {
    selected: 0,
    color: "#a9b7b7",
    selectedColor: "#F96D3D",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "发现",
        "iconPath": "/images/discover-unselect.png",
        "selectedIconPath": "/images/discover-selected.png"
      },
      {
        "pagePath": "/pages/hotRecommend/hotRecommend",
        "text": "热门书评",
        "iconPath": "/images/book-unselect.png",
        "selectedIconPath": "/images/book-selected.png"
      },
      {
        "pagePath": "/pages/aboutMe/aboutMe",
        "text": "我的",
        "iconPath": "/images/my-unselect.png",
        "selectedIconPath": "/images/my-selected.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})