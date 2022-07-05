const { Router } = require('express')
const { authMiddleware, userMiddleware } = require('../middlewares')
const { userController } = require('../controllers')

const userRouter = Router()

userRouter.get('/', userController.getStaticPage)

userRouter.get('/users', userController.getAllUser)

userRouter.patch('/:userIndex', userController.getUserById)
userRouter.put('/:userIndex', userController.updateUserRols)
userRouter.put('/:userIndex/low', userController.downgrade)
userRouter.delete('/:userIndex', userController.deleteUserById)
userRouter.use('/:userIndex', authMiddleware.getUserDynamically('userIndex', 'params', 'id'))
userRouter.post('/:userIndex/photo', userMiddleware.checkUserAvatar, userController.uploadUserPhoto)


module.exports = userRouter
