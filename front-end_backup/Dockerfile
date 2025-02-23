# **1️⃣ 使用 Node.js 作为构建阶段**
FROM node:20.12.0 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制整个项目文件
COPY . .

# 运行 `npm run build`，生成 `dist/` 静态文件
RUN npm run build

# **2️⃣ 使用 Nginx 作为生产服务器**
FROM nginx:latest

# 复制前端构建的 `dist/` 到 Nginx 目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 运行 Nginx
CMD ["nginx", "-g", "daemon off;"]
