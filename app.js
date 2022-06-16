const express = require('express')
const mongoose = require('mongoose')
const { PORT, MONGO_URL } = require('./config/config')
const authRouter = require('./routes/authRouter')
const ApiError = require('./errors/error')

const app = express()

async function _start () {
    try{
        await mongoose.connect(MONGO_URL).then(()=>{
            console.log('success')})
      
    
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)})
    }
    catch(e){
        console.log('Server Error')
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
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth', authRouter)
app.use('*',_notFoundHandler)
app.use(_mainErrorHendler)

_start()