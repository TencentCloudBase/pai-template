// 借助云开发能力做小程序的用户鉴权

const TcbJwt = require('@cloudbase/jwt-sdk')

module.exports = (socket, next) => {
    let tcbConfig = {}
    try{
        const vemofile = require('../../vemofile')
        if(vemofile && vemofile.cloudbase && vemofile.cloudbase.env){
            tcbConfig.env = vemofile.cloudbase.env
        }
    }
    catch(e){
        console.log("can't not find vemofile")
    }
    let tcbJwt = new TcbJwt({
        type: 'websocket',
        tcbConfig,
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