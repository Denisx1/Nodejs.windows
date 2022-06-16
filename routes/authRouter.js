const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/authController')

router.post('/register', authMiddleware.newUserValidator, authMiddleware.checkEmailIsDublickate, controller.createUser)

router.post('/login')



module.exports = router