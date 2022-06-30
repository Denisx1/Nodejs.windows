const { Router } = require('express')
const { authMiddleware } = require('../middlewares')
const { authController, userController } = require('../controllers')
const { FORGOT_PASSWORD } = require('../constants')
const { forgotPasswordJoiSchema } = require('../validator')

const router = Router()

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, authController.createUser)

router.post('/login', authMiddleware.authValidator, authController.login)

router.get('/login/users', userController.getLoginUser)

router.get('/activate/:link',authController.activation)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout)

router.post('/regresh', authMiddleware.checkRefreshToken, authController.refresh)

router.post('/password/forgot',authMiddleware.authValidator, authController.forgotPassword)

router.patch('/password/forgot', authMiddleware.checkActionToken(FORGOT_PASSWORD, forgotPasswordJoiSchema), authController.setPasswordAfterForgot)


module.exports = router