# Walking Calculator

**一个辅助你在朋友之间记账的 App 。记录好每笔开销的明细，并帮你计算出最终的债务去向。已适配深色模式。**

## 👀 Preview

![IMG_1837](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_1837.JPEG)

![IMG_1838](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_1838.JPEG)

![IMG_1856](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_1856.JPEG)

![IMG_1857](https://raw.githubusercontent.com/HongDing97/imgs/main/uPic/IMG_1857.JPEG)

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

### Electron

切换至 `electron` 分支，再进行打包

```bash
# 首次运行先安装 electron 相关依赖
yarn install            
# 打包，输出在 ./dist 目录
yarn run electron-pack
```
