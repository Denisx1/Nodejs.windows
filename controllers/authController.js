const { authService, emailService } = require('../services')
const { User, Amodel, Role } = require('../database')
const { API_URL, CLIENT_URL } = require('../config/config')
const uuid = require('uuid')


module.exports = {
    createUser: async (req, res, next)=>{
        try{
            const { email } = req.body

            const hashPassword = await authService.hashPassword(req.body.password)

            const activationLink = uuid.v4()

            const userRole = await Role.findOne({value: "USER"})

            const createUser = await User.create({
                ...req.body,
                password:hashPassword,
                role: userRole.value,
                activationLink
            })

            await emailService.sendActivationMail(email, `${API_URL}/auth/activate/${activationLink}`)

            res.json({
                createUser,
                Text: `проверьте почту ${email} и кликните на ссылку активации`
            })
        }catch(e){
            next(e)
        }
    },

    login: async (req, res, next)=>{
        try{
            const { user, body: { password } } = req
            const { email } = req.body

            await authService.comparePassword(user.password, password)

            const tokenPair = authService.generateToken( { userId: user._id } )

            await Amodel.create({user_id: user._id, ...tokenPair})

            await emailService.sandMailLogin(email)

            res.json({
                ...tokenPair,
                user,
                Text: 'Вход выполен'
            })

        }catch(e){
            next(e)
        }
    },

    logout: async (req, res, next)=>{
        try{
            const authUser = req.authUser
            
            await Amodel.deleteMany({user_id: req.authUser._id})

            res.json('logout its ok')
        }catch(e){
            next(e)
        }
    },

    refresh: async (req, res, next)=>{
        try{
            const {authUser} = req
            const tokenPair = authService.generateToken({userId: authUser._id})

            await Amodel.create({user_id: authUser._id, ...tokenPair})

            res.json({...tokenPair, authUser})
        }catch(e){
            next(e)
        }
    },

    activation: async (req, res, next) =>{
        try{
            const activationLink = req.params.link

            await emailService.activate(activationLink)

            res.redirect(CLIENT_URL)
        }catch(e){
            console.log(e)
        }
    }
}