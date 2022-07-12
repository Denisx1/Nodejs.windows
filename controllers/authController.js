const { authService, emailService } = require('../services')
const { User, Amodel, Role, ActionToken } = require('../database')
const { API_URL, CLIENT_URL, FRONTEND_URL } = require('../config/config')
const { actionTypeEnum, emailActionEnum } = require('../constants')
const uuid = require('uuid')


module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { email, password } = req.body

            const hashPassword = await authService.hashPassword(password)

            const activationLink = uuid.v4()

            const createUser = await User.create({
                ...req.body,
                password: hashPassword,
                activationLink
            })
            
            // const sendMail = await emailService.sendActivationMail(email, `${API_URL}/auth/activate/${activationLink}`)

            res.json({
                createUser,
                text: `проверьте почту ${email} и кликните на ссылку активации`
            })
        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {
        try {
            const { password, email, user } = req.body

            await user.checkIsPasswordsSame(password)

            await authService.comparePassword(user.password, password)

            const tokenPair = authService.generateToken({ userId: user._id })

            await Amodel.create({ user_id: user._id, ...tokenPair })


            res.json({
                ...tokenPair,
                user,
                Text: 'Вход выполен'
            })

        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const authUser = req.authUser

            await Amodel.deleteMany({ user_id: req.authUser._id })

            res.json('logout its ok')
        } catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { authUser } = req
            const tokenPair = authService.generateToken({ userId: authUser._id })

            await Amodel.create({ user_id: authUser._id, ...tokenPair })

            res.json({ ...tokenPair, authUser })
        } catch (e) {
            next(e)
        }
    },

    activation: async (req, res, next) => {
        try {
            const activationLink = req.params.link

            await emailService.activate(activationLink)

            res.redirect(CLIENT_URL)
        } catch (e) {
            next(e)
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { user: { _id, name } } = req
            const { email } = req.body
            
            const token = authService.genrateActionToken({ userId: _id })
            console.log(token)
            await ActionToken.create({
                token,
                user_id: _id,
                actionType: actionTypeEnum.FORGOT_PASSWORD
            })

            const forgotPasswordUrl = `${FRONTEND_URL}/password/forgot?token=${token}`
            
            await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {
                forgotPasswordUrl,
                userName: name
            })

            res.json('ok')
        } catch (e) {
            next(e)
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user, body } = req

            const newPassword = await authService.hashPassword(body.password)
            
            await User.updateOne(
                { _id: user._id },
                { password: newPassword })

            await Amodel.deleteMany({ user_id: user._id })
            
            await ActionToken.deleteOne({ token: body.token })

            res.json('пароль изменен')

        } catch (e) {
            next(e)
        }
    }
}