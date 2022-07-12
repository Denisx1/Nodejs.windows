const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const fileUpload = require('express-fileupload')
const socketIO = require('socket.io')

const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const ApiError = require('./errors/error')
const cronRun = require('./cronJobs')
const swaggerJson = require('./swagger.json')
const socketRouter = require('./routes/socketRouter')
const { PORT, MONGO_URL, NODE_ENV, } = require('./config/config')


const app = express()

const server = http.createServer(app)
const io = socketIO(server, { cors: { origin: '*' } })

io.on('connection', (socket) => socketRouter(io, socket))

async function _start() {
    try {
        await mongoose.connect(MONGO_URL).then(() => {
            console.log('success')
        })

        server.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })

        cronRun()
    }
    catch (e) {
        console.log('dataBase or Server not connect')
    }
}

function _notFoundHandler(req, res, next) {
    next(new ApiError('Not Found', 404))
}

function _mainErrorHendler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Server Error',
        status: err.status,
        data: []
    })
}

global.appRoot = path.resolve(__dirname);

app.use(fileUpload())

if (NODE_ENV === 'local') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.static('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)
app.use('/auth', authRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use('*', _notFoundHandler)

app.use(_mainErrorHendler)

_start()