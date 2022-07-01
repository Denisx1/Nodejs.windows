const { authService, emailService } = require('../services')
const { User, Amodel, Role, ActionToken } = require('../database')
const { API_URL, CLIENT_URL, ACTION_TOKEN_SECRET } = require('../config/config')
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

            const sendMail = await emailService.sendActivationMail(email, `${API_URL}/auth/activate/${activationLink}`)

            res.json({
                createUser,
                text: `проверьте почту ${sendMail} и кликните на ссылку активации`
            })
        } catch (e) {
            next(e)
        }
    },

    login: async (req, res, next) => {
        try {
            const { password, email, user } = req.body

            await authService.comparePassword(user.password, password)

            const tokenPair = authService.generateToken({ userId: user._id })

            await Amodel.create({ user_id: user._id, ...tokenPair })

            await emailService.sandMailLogin(email)

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

            await ActionToken.create({
                token,
                user_id: _id,
                actionType: actionTypeEnum.FORGOT_PASSWORD
            })

            const forgotPasswordUrl = `${CLIENT_URL}/password/forgot?token = ${token}`

            await emailService.forgotPassword(email, emailActionEnum.FORGOT_PASSWORD, {
                forgotPasswordUrl,
                userName: name
            })

            res.json('Logout its ok')
        } catch (e) {
            next(e)
        }
    },

    setPasswordAfterForgot: async (req, res, next) => {
        try {
            const { user: { _id }, body } = req
            const newPassword = await authService.hashPassword(body.password)

            await User.updateOne(
                { _id: _id },
                { password: newPassword })

            await Amodel.deleteMany({ user_id: _id })

            await ActionToken.deleteMany({ token: body.token })

            res.json('Ok')

            next()
        } catch (e) {
            next(e)
        }
    }
}