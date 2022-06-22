const { Router } = require('express')
const { authMiddleware, userMiddleware } = require('../middlewares')
const { authController, userController } = require('../controllers')

const router = Router()

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, authController.createUser)

router.post('/login', authMiddleware.isLoginValid, authMiddleware.getUserDynamically('email'), authController.login)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout)

router.post('/regresh', authMiddleware.checkRefreshToken, authController.refresh)


module.exports = router