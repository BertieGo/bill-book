
## Introduce
Hey, 你好，一直非常喜欢 XMind，也非常热衷于前端技术，希望能借此机会一起共事。

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

假如已经安装了 docker 和 docker-compose，那么可以直接运行根目录下的 `` docker-start.sh `` 完成项目的启动，而不需要去关注
 Node、MongoDB 环境的搭建。
 
 当 docker-compose 将所有容器启动之后，就可以通过访问 http://localhost:4000/x-mind-home-work 的方式来访问。
 
 - #### No Docker
 > 测试机版本参考  
 > MacOS Mojave 10.14.6，Node 12.13.0，MongoDB 4.2.5  

- 首先需要安装并启动 MongoDB，默认端口为：`` 27017``。
- 运行根目录下 `` no-docker-starter.sh ``。

访问方式：http://localhost:3000

 ## Consider
 
 前端：
 后端:

前端技术选型：
![images](https://github.com/BertieGo/bill-book/blob/master/mind-images/frontend-tech-pick.png?raw=true)

目录结构：

```
project
│   README.md
│   file001.txt    
│
└───folder1
│   │   file011.txt
│   │   file012.txt
│   │
│   └───subfolder1
│       │   file111.txt
│       │   file112.txt
│       │   ...
│   
└───folder2
    │   file021.txt
    │   file022.txt
```

