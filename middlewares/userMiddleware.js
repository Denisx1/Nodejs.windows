const ApiError = require('../errors/error')
const { regexp } = require('../constants')
 

const checkUserAvatar = (req, res, next)=>{
    try{
        
        if(!req.files || !req.files.avatar){
            next(new ApiError('No File', 400))
            return
        }

        const { size, mimetype, } = req.files.avatar

        if(size > regexp.IMAGE_MAX_SIZE){
            next(new ApiError('Max file size should be 5mb', 400))
            return
        }

        if(!regexp.IMAGE_MIMETYPE.includes(mimetype)){
            next(new ApiError('Wrong file type', 400))
            return
        }

        next()
    }catch(e){
        next(e)
    }
}

module.exports = {
    checkUserAvatar
}