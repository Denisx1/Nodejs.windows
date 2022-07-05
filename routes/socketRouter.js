const { socketController } = require('../controllers')

module.exports = (io, socket) => {

    socket.use((infoArr, next) => {

        console.log(socket.handshake.query.token);
        console.log(socket.id);
        const [event, ...data] = infoArr

        if (event.startsWith('message:')) {
            console.log('SOCKET MESSAGE ROUTER');

            return next();
        }

        if (event.startsWith('broadcast:')) {
            console.log('SOCKET BROADCAST ROUTER');

            socket.on('broadcast:to:all', (data) => socketController.broadcastToAllUsers(io, socket, data));

            socket.on('broadcast:not:me', () => socketController.broadcastAvoidSender(io, socket));

            // do not forget to call next
            return next()
        }
    })

    socket.on('message:create', (data) => socketController.sendMessage(io, socket, data))
}