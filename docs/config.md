---
title: vuepress+Travis CI+github pages搭建个人博客
date: 2021-01-04
---

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)

::: tip 介绍
1. 这是基于vuepress+Travis CI+github pages搭建的个人博客
3. 你可以打开 [33博客](https://lss-33.github.io/) 来查看效果。
:::
### 搭建专属自己的个人博客吧
::: tip 实现思路
1. 这是基于vuepress+Travis CI+github pages搭建的个人博客
2. 你可以打开 [33博客](https://lss-33.github.io/) 来查看效果。
3. 基本实现思路就是，在`master`分支存放源代码、在另一个分支存放build之后的静态文件比如`gh-pages`，然后在`github Pages`中选择`gh-pages`，这样就可以访问到啦～实现思路参考[VuePress + Travis CI + Github Pages 全自动上线文档](https://juejin.cn/post/6844903869558816781)
:::

- 克隆空的仓库
```bash
#克隆自己的仓库
git clone git@github.com:lss-33/lss-33.github.io.git
```

- 在项目中初始化vuepress工程

```bash
yarn global add @vuepress-reco/theme-cli

theme-cli init .

yarn install

yarn dev

yarn build
```

- 在项目根目录下分别创建`.travis.yml`和`deploy.sh`两个文件
```bash
# 在此贴出.travis.yml,在vuepress文档就说的很详细了，就不做阐述了
language: node_js
node_js:
    - lts/*
cache: yarn
install:
    - yarn install
script:
    - yarn build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master #这里指的是部署前的源文件分支
```

- push代码之后在Travis CI中看到这个就说明没问题了
```bash
The command "yarn build" exited with 0.
cache.2
store build cache
dpl_0
1.74s$ rvm $(travis_internal_ruby) --fuzzy do ruby -S gem install dpl
7.04s
dpl.1
Installing deploy dependencies
dpl.2
Preparing deploy
dpl.3
Deploying application
Done. Your build exited with 0.
```

- 其实各种文档都写的非常清楚明了，大家都是在一步步试错中最后成功了！
- 33在此贴心的为大家附上各种文档连接～[vuepress](https://www.vuepress.cn/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84)[阮一峰持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

### 个人总结
::: tip 此次小项目的总结
  通过这次个人博客的搭建，对自动化构建有了一个新的认知（说实话以前一直真心没咋理解）。其实就是不需要人工去每一遍修改完代码再去重新build项目了，而是在修改完代码push到仓库时，直接自动化帮我们去build这个代码，确实简直不要太方便了。33革命尚未成功，33仍需努力💪
:::
