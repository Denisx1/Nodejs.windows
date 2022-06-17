const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/authController')
const authController = require('../controllers/authController')

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, controller.createUser)

router.post('/login', authMiddleware.isLoginValid, authMiddleware.getUserDynamically('email'), authController.login)



module.exports = router