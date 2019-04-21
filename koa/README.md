# koa

基于 [koa](https://github.com/koajs/koa) 框架的 `hello world demo`。

## 获取机器的 IP 和密码

购买主机后，到腾讯云 `云主机控制台` 获取机器的 `IP` 并且到 `消息中心` 获取主机的密码。

## 初始化项目

```shell
git clone https://github.com/lcxfs1991/pai-template.git

## 进入 koa demo 目录
cd koa

npm install
```

## 开发

```js
npm start
```

## 部署

安装 [@cloudbase/cli](https://github.com/TencentCloudBase/cloud-base-cli)。

```js
npm i -g @cloudbase/cli
```

然后基于 `tcb.example.json` 创建 `tcb.json` 配置文件，然后填入机器的 `IP` 和 `SSH` 登陆密码。然后运行以下命令进行部署。

```js
tcb deploy --start
```

如果是进行重启，则运行以下命令：

```js
tcb deploy
```