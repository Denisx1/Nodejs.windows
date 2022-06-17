const { Router } = require('express')
const userRouter = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

userRouter.get('/users', userController.getAllUser)
userRouter.get('/login/users', userController.getLoginUser)
userRouter.get('/:userIndex', userController.getUserById)

userRouter.put('/:userIndex', userController.updateUserRols)

userRouter.delete('/:userIndex', userController.deleteUserById)

userRouter.use('/:userIndex', authMiddleware.getUserDynamically('userIndex', 'params', '_id'))


module.exports = userRouter