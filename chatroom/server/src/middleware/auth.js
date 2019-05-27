// 借助云开发能力做小程序的用户鉴权

const TcbJwt = require('@cloudbase/jwt-sdk')

module.exports = (socket, next) => {
    let tcbJwt = new TcbJwt({
        type: 'websocket',
        tcb: socket.tcb,
    })

    tcbJwt.init(socket).then(() => {
        next()
    }).catch((e) => {
        let error = {
            code: e.code,
            message: e.message || '鉴权错误'
        }
        console.log(`[code:${error.code}] message:${error.message}`)
        next(error)
    })
}