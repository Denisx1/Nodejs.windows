const { Router } = require('express')
const { authMiddleware, userMiddleware } = require('../middlewares')
const { authController, userController } = require('../controllers')
const { activate } = require('../services/emailService')

const router = Router()

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, authController.createUser)

router.post('/login', authMiddleware.isLoginValid, authMiddleware.getUserDynamically('email'), authController.login)

router.get('/login/users', userController.getLoginUser)

router.get('/activate/:link',authController.activation)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout)

router.post('/regresh', authMiddleware.checkRefreshToken, authController.refresh)


module.exports = router