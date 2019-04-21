# chatroom

基于 [vemo](https://github.com/vemoteam/vemo) 运行框架的小程序聊天室 `demo`。

## 前置条件
* 注册小程序
* 开通云开发
* 安装 Node.js, Npm 和微信开发者工具

## 获取机器的 IP 和密码

购买主机后，到腾讯云 `云主机控制台` 获取机器的 IP 并且到 `消息中心` 获取主机的密码。

## 获取腾讯云 SecretId 和 SecretKey

获取 `secretId` 和 `secretKey`。通过此[链接](https://www.qcloud.com/login/mp?s_url=https%3A%2F%2Fconsole.cloud.tencent.com%2Fcam%2Fcapi)登录小程序对应的腾讯云帐号(需要小程序管理员或拥有者权限)，然后在[云API密钥](https://console.cloud.tencent.com/cam/capi) 里获取。

![](https://main.qcloudimg.com/raw/63512b321eee6c8779d6cb5b20f641cf.png)

## 初始化项目


```shell
git clone https://github.com/lcxfs1991/pai-template.git

## 进入 chatroom demo 的服务器端代码目录
cd chatroom/server

## 安装依赖
npm install

## 安装命令行工具
npm i -g @cloudbase/cli

## 登陆并填入腾讯云的 secretId 和 secretKey
tcb login
```

## 开发

在微信开发者工具中，上传云函数 `cloud/functions/tcb-auth`，然后运行以下命令：

```js
npm start
```


## 部署

* 更改 `client/config/index.js` 中的链接，将其改成生产环境的地址。

* 基于 `tcb.example.json` 创建 `tcb.json` 配置文件，然后填入机器的 `IP` 和 `SSH` 登陆密码。然后运行以下命令进行部署。

* 运行以下命令，将服务部署到云主机

```js
tcb deploy --start
```

* 如果是进行重启，则运行以下命令：

```js
tcb deploy
```