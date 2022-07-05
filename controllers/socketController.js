module.exports = {
    sendMessage: (io, socket, data) => {
        console.log('MESSAGE CREATED')
        

        socket.emit('message:save', data)
    },

    broadcastToAllUsers: (io, socket, data) => {
        // broadcast to all users

        socket.join('room1')
        io.emit('broadcast:all', {broadcast: 'ALL'})
    },

    broadcastAvoidSender: (io, socket) => {
        // broadcast to all users avoid sender
        socket.broadcast.emit('broadcast:all:not:me', {})

        io.to('room1').emit("adasd", 'asdsa')

        socket.leave('room1')
    }
}