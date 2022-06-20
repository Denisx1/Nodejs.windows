const { Router } = require('express')
const { authMiddleware } = require('../middlewares')
const { userController } = require('../controllers')
const userRouter = Router()

userRouter.get('/users', userController.getAllUser)
userRouter.get('/login/users', userController.getLoginUser)
userRouter.get('/:userIndex', userController.getUserById)

userRouter.put('/:userIndex', userController.updateUserRols)
userRouter.put('/:userIndex/low', userController.downgrade)

userRouter.delete('/:userIndex', userController.deleteUserById)

userRouter.use('/:userIndex', authMiddleware.getUserDynamically('userIndex', 'params', '_id'))


module.exports = userRouter
