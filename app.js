const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const { PORT, MONGO_URL, NODE_ENV } = require('./config/config')
const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRouter')
const ApiError = require('./errors/error')
const path = require('path')
const cronRun = require('./cronJops')
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')

const app = express()

async function _start () {
    try{
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log('success')})

        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)})

            cronRun()
    }
    catch(e){
        console.log('Server Error1')
    }
}

function _notFoundHandler(req, res, next){
    next(new ApiError('Not Found', 404))
}

function _mainErrorHendler(err, req, res, next){
    res.status(err.status || 500).json({
        message: err.message || 'Server Error',
        status : err.status,
        data: []
    })
}

global.appRoot = path.resolve(__dirname);

app.use(fileUpload())

if(NODE_ENV === 'local'){
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('dev'));
app.use('/auth', authRouter)
app.use('/', userRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use('*',_notFoundHandler)

app.use(_mainErrorHendler)

_start()