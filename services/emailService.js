const nodemailer = require('nodemailer')
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
            subject: `Активация аккаунта ${API_URL}`,
            text: '111',
        })
    }
}

module.exports = new MailService()