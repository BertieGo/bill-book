### 工具选型：
![images](https://github.com/BertieGo/bill-book/blob/master/mind-images/frontend-tech-pick.png?raw=true)

### 目录结构：  
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

### Consider  

在作业中有需要展示收支总额和各类型支出统计的功能，想到使用图表📈的形式去展示，采取两种的展示方式,
- 条形图，用于排序展示会比较直观，使用的是 `` div ``  去实现。
- 饼图, 用于展示占比。 饼图使用 ``svg path`` 内的弧形 `` A `` API 来实现的。首先计算每个类型的占比，然后通过占比去求得每一块饼的角度，然后已知圆心、角度、半径的前提下，
可以求得对应的饼的路径。

同时，图表内的颜色为随机生成所有色域内的值，那么可能会生成接近白 / 黑的色值，或者生成连续的两个色值很接近的颜色，
这两种情况都不利于图表的展示。所以通过 [Generate Random Color distinguishable to Humans](https://stackoverflow.com/a/31817723/13804371) 内回答的提示，
使用 ``HSL`` 描述颜色的方式去区分每一次生成的颜色是否跟之前的颜色有足够的不同且不接近白色或黑色。
同时在自己的 
[版本](https://github.com/BertieGo/bill-book/blob/master/frontend/src/utils/color/index.ts) 内去做了精简实现。

