module.exports = {
  "base":'/lss-33.github.io/',
  "title": "33",
  "description": "大力出奇迹。",
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
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "题外",
        "icon": "reco-blog",
        "items":[
          {
            "text":"33知识体系",
            "link": "../blogs/other/20210129.md",
            "icon": "reco-blog"
          },
          {
            "text":"33TODO",
            "link": "../blogs/other/TODO.md",
            "icon": "reco-blog"
          },
        ]
      },
      {
        "text": "关于33",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/lss-33",
            "icon": "reco-github"
          },
          {
            "text": "CSDN",
            "link": "https://blog.csdn.net/weixin_46254175?t=1",
            "icon": "reco-blog"
          },
          {
            "text": "CodePen",
            "link": "https://codepen.io/lss-33",
            "icon": "reco-blog"
          },
          {
            "text":"33自我介绍",
            "link":"../blogs/other/guide.md",
            "icon": "reco-blog"
          }
        ]
      }
    ],   
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "博客"
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
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "33",
    "authorAvatar": "/avatar.png",
    "record": "前端相关",
    "startYear": "2020",
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": [
    [
      "cursor-effects",
      {
        size: 3,                    
        shape: ['circle'], 
        zIndex: 999999999
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