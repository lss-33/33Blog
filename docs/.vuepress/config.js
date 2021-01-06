module.exports = {
  "base":'/lss-33.github.io/',
  "title": "33",
  "description": "一个前端程序媛的博客",
  "dest": "docs/.vuepress/dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon1.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/lss-33",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "欢迎你来到33博客",
        "desc": "工友们，一起努力打工做人上人！",
        "avatar": "https://github.com/lss-33",
        "link": "https://github.com/lss-33"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "33",
    "authorAvatar": "/avatar.png",
    "record": "前端相关",
    "startYear": "2020"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      "cursor-effects",
      {
        size: 2,                    // size of the particle, default: 2
        shape: ['circle'],  // shape of the particle, default: 'star'， 可选'circle'
        zIndex: 999999999           // z-index property of the canvas, default: 999999999
      }
    ],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "回来啦～",
        hideIcon: "/failure.ico",
        hideText: "回来吃柿子！",
        recoverTime: 2000
      }
    ]
  ]
}