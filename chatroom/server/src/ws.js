async function leaveRoom(socket, db) {
    console.log('ws')
    console.log(process.env.TENCENTCLOUD_SECRETID)
    console.log(process.env.TENCENTCLOUD_SECRETKEY)
    try {
        // 离开房间，从房间中将用户自己删除，如果再没有用户了，将房间也删除
        let user = socket.user
        let room = await db.collection('rooms').where({
            room: socket.room,
        }).get()
        let roomData = room.data || []

        if (roomData.length) {
            let member = roomData[0].member
            let index = member.indexOf(user.openId)

            if (index > -1) {
                member.splice(index, 1)
            }

            // 还有用户，则更新用户清单
            if (member.length) {
                await db.collection('rooms').doc(roomData[0]._id).update({
                    member
                })
            }
            // 没有用户连房间也删除
            else {
                await db.collection('rooms').doc(roomData[0]._id).remove()
            }
        }
    }
    catch (e) {
        console.error(e)
    }
}

async function joinRoom(socket, db, roomID) {
    try {
        let room = await db.collection('rooms').where({
            room: roomID,
        }).get()
        let roomData = room.data || []

        if (!roomData.length) {
            await db.collection('rooms').add({
                room: roomID,
                member: [socket.user.openId]
            })
        }
        else {
            let member = new Set(roomData[0].member)
            member.add(socket.user.openId)
            await db.collection('rooms').doc(roomData[0]._id).update({
                member: Array.from(member)
            })
        }
        socket.room = roomID
    }
    catch (e) {
        console.error(e)
    }
}

async function sendMessage(socket, { roomID, event, msgRoom, msgSelf }) {

    await socket.emit(event, msgSelf)

    await socket.to(roomID).emit(event, msgRoom)
}

module.exports = (socket, ctx) => {

    const db = ctx.tcb.database()

    const { user = {}} = socket
    console.log('connect ' + socket.id)

    socket.on('join-room', async (roomID) => {
        // 加入房间
        socket.join(roomID, async () => {
            let event = 'message'

            await joinRoom(socket, db, roomID)

            let msgRoom = {
                type: 'join',
                nickName: user.nickName || 'anonymity',
                avatarUrl: user.avatarUrl,
                value: `enters room ${roomID}.`
            }
            let msgSelf = {
                type: 'join',
                nickName: user.nickName || 'anonymity',
                avatarUrl: user.avatarUrl,
                isSelf: true,
                value: `enter room ${roomID}.`
            }

            sendMessage(socket, { roomID, event, msgRoom, msgSelf })
        })
    })

    socket.on('leave-room', async (data) => {
        // 离开房间
        let roomID = socket.room
        await leaveRoom(socket, db)
        socket.leave(roomID, async () => {
            let event = 'message'
            let message = {
                type: 'exit',
                nickName: user.nickName || 'anonymity',
                avatarUrl: user.avatarUrl,
                value: `exits room ${roomID}.`
            }

            socket.to(roomID).emit(event, message)
        })
    })

    socket.on('message', (data, ack) => {
        let roomID = socket.room
        let event = 'message'
        let msgRoom = {
            type: 'message',
            nickName: user.nickName || 'anonymity',
            avatarUrl: user.avatarUrl,
            value: `${data}`
        }
        let msgSelf = {
            type: 'message',
            nickName: user.nickName || 'anonymity',
            avatarUrl: user.avatarUrl,
            isSelf: true,
            value: `${data}`
        }

        sendMessage(socket, { roomID, event, msgRoom, msgSelf })

        ack && ack()
    })

    socket.on('disconnect', async () => {
        const { user = {}} = socket
        console.log('disconnect ' + socket.id)
        let roomID = socket.room

        await leaveRoom(socket, db)

        let event = 'message'
        let message = {
            type: 'exit',
            nickName: user.nickName || 'anonymity',
            avatarUrl: user.avatarUrl,
            value: `exits room ${roomID}.`
        }

        socket.to(roomID).emit(event, message)
    })
}