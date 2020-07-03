FROM node

# 注释
LABEL maintainer = "Bertie Huang <841052064@qq.com>"

# 创建工作目录
RUN rm -rf /app
RUN mkdir /app
WORKDIR /app

# 安装项目依赖
COPY . /app
RUN npm install

# 对外暴露端口
EXPOSE 8800

# 启动 Image 时执行命令
CMD NODE_ENV=docker node index.js
