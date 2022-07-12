const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const { SMTP_HOST, SMTP_PORT, SYSTEM_MAIL, SYSTEM_MAIL_PASSWORD, FRONTEND_URL } = require('../config/config')

// TODO show moduleAlias
const templateInfoObject = require('../email-templates');
const ApiError = require('../errors/error')

const sendMail = async (receiverMail, emailAction, locals = {}) => { // emailActionEnum.WELCOME
  const templateRenderer = new EmailTemplate({
    views: {
      root: path.join(process.cwd(), 'email-templates')
    }
  });

  const templateInfo = templateInfoObject[emailAction];

  if (!templateInfo) {
    throw new ApiError('Wrong email action')
  }

  Object.assign(locals, { frontendURL: FRONTEND_URL })

  const html = await templateRenderer.render(templateInfo.templateName, locals);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SYSTEM_MAIL,
        pass: SYSTEM_MAIL_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SYSTEM_MAIL,
    to: receiverMail,
    subject: templateInfo.subject,
    html
  })
}

module.exports = {
  sendMail
}