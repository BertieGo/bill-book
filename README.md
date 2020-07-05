
## Introduce

小小前端开发一枚，一直非常非常非常喜欢 XMind，也使用了多年的 XMind，也热衷于软件技术，希望能借此机会能一起共事 🥰。

本作业的线上演示地址：[x-mind-home-work](https://0504.pet/x-mind-home-work)  

针对本作业的需求：简易的记账单功能。选取的技术为前后端分离的模式，技术选型分别为：
- 前端：Typescript / React / Ant Design
- 后端：Node / Express
- 数据库：MongoDB
- 单元测试：Jest 
- 容器/编排：Docker / Docker-Compose

## Usage

- #### Docker

> 测试机版本参考  
> MacOS Mojave 10.14.6，Docker 19.03.5，Docker-Compose 1.24.1  
> Ubuntu 16.04.1 LTS, Docker 19.03.8, Docker-Compose 1.18.0  
 > 确认端口 4000、8800、27017 未被占用

假如已经安装了 docker 和 docker-compose，那么可以直接运行根目录下的 `` docker-start.sh `` 完成项目的启动，而不需要去关注
 Node、MongoDB 环境的搭建。
 
 当 docker-compose 将所有容器启动之后，就可以通过访问 http://localhost:4000/x-mind-home-work 的方式来访问。
 
 - #### No Docker
 > 测试机版本参考  
 > MacOS Mojave 10.14.6，Node 12.13.0，MongoDB 4.2.5    
 > 确认端口 3000、8800、27017 未被占用

- 首先需要安装并启动 MongoDB，默认端口为：`` 27017``。
- 运行根目录下 `` no-docker-starter.sh ``。

访问方式：http://localhost:3000

 ## Consider
 
 ### 前端
 #### 工具选型：
 ![images](https://github.com/BertieGo/bill-book/blob/master/mind-images/frontend-tech-pick.jpg?raw=true)
 
 #### 目录结构：  
 ```
 ./src
 ├── App.css
 ├── App.tsx // 业务容器
 ├── components // 公用组件文件夹
 │   ├── Bar // 条形图
 │   │   ├── Bar.test.tsx
 │   │   ├── __snapshots__
 │   │   │   └── Bar.test.tsx.snap
 │   │   └── index.tsx
 │   ├── CategorySelector // 类型选择器，用于选取账单种类
 │   │   ├── Category.test.tsx
 │   │   ├── __snapshots__
 │   │   │   └── Category.test.tsx.snap
 │   │   └── index.tsx
 │   └── Pie // 饼状图，采用 svg 的 path 作图
 │       ├── Pie.test.tsx
 │       ├── __snapshots__
 │       │   └── Pie.test.tsx.snap
 │       └── index.tsx
 ├── config // 环境变量
 │   └── env.ts
 ├── constants.ts // 全局常量
 ├── container // 业务组件
 │   ├── AddBillForm // 添加账单
 │   │   └── index.tsx
 │   ├── Charts // 图标栏
 │   │   └── index.tsx
 │   ├── Filter // 筛选栏
 │   │   └── index.tsx
 │   ├── Table // 表格
 │   │   └── index.tsx
 │   └── Title // 页面顶部 Title
 │       └── index.tsx
 ├── declare.ts // ts 接口和类型
 ├── index.css
 ├── index.tsx
 ├── react-app-env.d.ts
 ├── request // ajax 请求列表
 │   ├── index.ts
 │   └── request.test.tsx
 ├── serviceWorker.ts
 ├── setupTests.ts
 └── utils // 工具集
     ├── color // 随机生成颜色
     │   └── index.ts
     ├── math // 包括小数点后 x 位截取功能
     │   └── index.ts
     ├── request // 提供公用的 get 和 post 方法用于请求 ajax
     │   └── index.ts
     └── test // Jest 为 react-create-app 所做的的 react component snapshot test polyfill
         └── polyfill.ts
 ```
 
 #### 问题与思路  
 
 在作业中需要展示收支总额和各类型支出统计，想到使用图表📈的形式去展示，采取两种的展示方式
 - 条形图，用于排序展示会比较直观，使用的是 `` div ``  去实现。
 - 饼图, 用于展示占比。 饼图使用 ``svg path`` 内的弧形 API 实现的。首先计算每个类型的占比，然后通过占比去求得每一块饼的角度，已知圆心、角度、半径的前提下，
 可以求得对应的饼的 ``path``。
 
 同时，图表内的颜色为随机生成的值，那么可能会生成接近白 / 黑的色值，或者生成连续的两个色值很接近的颜色，
 这两种情况都不利于图表的展示。所以通过 [Generate Random Color distinguishable to Humans](https://stackoverflow.com/a/31817723/13804371) 内回答的提示，
 使用 ``HSL`` 描述颜色的方式去区分每一次生成的颜色是否跟之前的颜色有足够的不同且不接近白色或黑色。
 同时在自己的 
 [版本](https://github.com/BertieGo/bill-book/blob/master/frontend/src/utils/color/index.ts) 内去做了精简实现。
 

 ### 后端
 
 #### 工具选型：
  ![images](https://github.com/BertieGo/bill-book/blob/master/mind-images/backend-tech-pick.jpg?raw=true)
  
 #### 目录结构：
 ```
├── Dockerfile
├── csv // 存储初始化数据的 csv 文件
│   ├── bill.csv
│   └── categories.csv
├── index.js // 业务主体
├── package.json
└── utils // 公用工具，内部 time 用于转换月份为 Timestamp
    └── time
        └── index.js
```
#### 思路
- 使用账单 csv 、单子类型 csv 初始化两张表，通过 `` aggregate `` 去聚合数据。
- 对外提供 3 个接口：获取账单列表、获取账单类型、添加账单。
- 后端设计这块会比较简单，故未遇到比较有意义的问题，在缓存、节流、错误处理上还有很多可以继续挖掘的地方...keep going...💪

### CI/CD

#### 思路
主要考虑为尽可能地对环境的依赖越少越好，所以采用的 Docker 的方式去处理。
- 用 Node 镜像映射前端代码进行打包，再将打包好的前端静态文件 ``COPY`` 到 Nginx 镜像内，生成新的镜像 ``x-mind/frontend``，该镜像暴露 4000 端口，也同时
是整个 compose 的访问入口。
- 基于 Node 镜像，直接将后端目录下的代码 ``COPY`` 到基础镜像内并 `` npm install`` 生成新的 ``x-mind/backend`` 镜像， 暴露 8800 端口供外部使用。
- 前端-后端-数据库三者容器的通信使用 ``networks`` 以 ``bridge`` 的形式进行沟通。

## Ending
应聘的职位等级为中级前端开发，非远程上班，也为了让 XMind 的大佬更多了解我，在完成了全部需求的同时，
也跟根据 jd 上的要求，使用 ``SVG`` 绘制饼图，同时添加了 CI/CD 这块。
考虑到 XMind 使用的可能是 ``Electron``，所以也在自学 ``Electron`` 中。
最后希望能有幸在 XMind 找到能奋斗一辈子的事情 ❤️。
