const nodemailer = require('nodemailer')
const { User } = require('../database')
const { SMTP_HOST, SMTP_PORT, SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD, API_URL } = require('../config/config')


class MailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth:{
                user: SYSTEM_MAIL,
                pass: SYSTEM_MAIL_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: SYSTEM_MAIL,
            to,
            subject: `Активация аккаунта` + API_URL,
            text: '111',
            html:

                    `<div><h1>Для активации аккаунта перейдите по ссылке</h1><a href="${link}">${link}</a></div>`
            
        })
    }

    async sandMailLogin(to){
        await this.transporter.sendMail({
            from: SYSTEM_MAIL,
            to,
            subject: 'оповещение',
            text:'111',
            html:

                    `<div><h1>вход в аккаунт выполнен</h1></div>`

        })
    }

    async forgotPassword(to){
        await this.transporter.sendMail({
            from: SYSTEM_MAIL,
            to,
            subject: 'оповещение',
            text:'111',
            html:

                    `<div><h1>пароль изменен</h1></div>`

        })
    }

    async activate (activationLink) {
        const user = await User.findOne({activationLink})
    
        if(!user){
            next(new ApiError('uncorrect linc activation', 400))
        }

        user.isActivated = true

        await user.save()
    }
}

module.exports = new MailService()