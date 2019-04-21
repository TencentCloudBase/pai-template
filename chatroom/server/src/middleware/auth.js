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
        console.error(e.message)
        next(new Error(e.message))
    })
}