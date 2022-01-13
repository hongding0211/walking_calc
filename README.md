# Walking Calculator

**一个辅助你在朋友之间记账的 App 。记录好每笔开销的明细，并帮你计算出最终的债务去向。已适配深色模式。**

## 👀 Preview

**Online Demo: [https://hong97.ltd/walkingcalc](https://hong97.ltd/walkingcalc)**

账号：13000000000

![IMG_1940](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_1940.JPEG)

![IMG_2023](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_2023.JPEG)

![IMG_2020](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_2020.JPEG)

## ⛏ 技术栈

- React
- Redux
- React Route v6
- Node.js + Express (https://github.com/HongDing97/walking_calc_srv)

### 原型图

![h4gv5G](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/h4gv5G.png)

## 🌟 Build & Run

在 **/src/config.js** 中修改 `host` 地址

```js
global.host = 'http://192.168.50.44:3001'		// 前端 host
global.srvHost = 'http://192.168.50.44:3000'		// 后端 host
```

```bash
# 打包，输出在 ./build 下
yarn build
```

### 记录定位

**💡 如果定位失败或者没有定位权限那么也不会记录或展示定位信息**

> 百度地图 API 指南： https://lbsyun.baidu.com/solutions/reactBmapDoc

在 **public/index.html** 中修改百度 API 的 TOKEN，百度地图用来显示订单创建时的位置

```jsx
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=<切换成你自己申请的AK>">< /script>
```

#### HTTPS

定位必须使用`HTTPS` ，而且前后端要保持一致

使用 Nginx Docker 镜像来部署 HTTPS 服务器，并且使用端口转发代理后端的 HTTP 协议

> 这里使用 `3610` 作为前端 HTTP 端口，`3600` 作为前端 HTTP 端口，`3510` 作为服务器 HTTPS 端口，`3500` 作为服务器 HTTP 端口

在 **/nginx** 中，放入 `.crt` `.key` 证书文件

然后修改 **/nginx/conf.d/default.conf**，替换证书对应的域名和证书文件名

```editorconfig
# 前端 https 访问
server {
  # SSL 访问端口号为 443
  listen 443 ssl; 
  # 填写绑定证书的域名
  server_name <domain> ; 
  # 证书文件名称
  ssl_certificate <xxx.crt> ; 
  # 私钥文件名称
  ssl_certificate_key <xxx.key>
  ...
}
```

修改后端 HTTPS 端口转发，和上面一样填入域名、证书名，并将后端 node docker 实例的名称填入

```editorconfig
# 后端 https 端口转发
server {
listen 3510 ssl;
  server_name <domain> ;
  ssl_certificate <xxx.crt> ;
  ssl_certificate_key <xxx.key> ;
  ssl_session_timeout 5m ;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 ;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE ;
  ssl_prefer_server_ciphers on ;

  location / {
    proxy_pass http://<后端docker名称>:3500 ;
  }
}
```

当使用 docker-compose 建立后端容器时，会把 node 和 mongodb 容器并入一个 network，使用 `docker network ls` 查看它们所属的 network。最后执行创建命令：

```bash
docker run -itd --restart=always -v <前端build目录>:/usr/share/nginx/html -v <nginx配置目录>:/etc/nginx -p 3600:80 -p 3610:443 -p 3510:3510 --net <后端docker网络> --link <后端docker名称>:<后端docker名称>
```

使用 `https://<domain>:3610` 即可访问服务
