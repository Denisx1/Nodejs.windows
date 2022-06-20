const { Router } = require('express')
const { authMiddleware } = require('../middlewares')
const { authController } = require('../controllers')
const router = Router()

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, authController.createUser)

router.post('/login', authMiddleware.isLoginValid, authMiddleware.getUserDynamically('email'), authController.login)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout)

router.post('/regresh', authMiddleware.checkRefreshToken, authController.refresh)


module.exports = router