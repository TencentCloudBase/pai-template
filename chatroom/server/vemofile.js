const path = require('path');
const authMiddleware = require('./src/middleware/auth')

module.exports = {
    'root': path.resolve('./src'),
    'static': true,
    'cloudbase': {
        // env: null
    }, // 启动云开发中间件
    'socket': true, // 如果值为对象，则是 socket.io 的配置参数
    'routes': [
        {
            path: 'static',
            type: 'static'
        },
        {
            path: 'index.js',
            template: 'template/h5.html',
            route: '/',
            method: 'get',
            middlewares: [] 
        },
        {
            path: 'ws.js',
            type: 'websocket',
            route: '/ws',
            middlewares: [authMiddleware]
        },
    ]
}