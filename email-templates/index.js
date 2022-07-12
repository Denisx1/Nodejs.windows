const {  emailActionEnum } = require("../constants");




module.exports = {
    [ emailActionEnum.WELCOME]:{
        subject: 'welcome on board',
        templateName: 'welcome'
    },

    [ emailActionEnum.ORDER_COMPLETE]:{
        subject: 'welcome on board',
        templateName: 'Order'
    },
    [ emailActionEnum.FORGOT_PASSWORD]:{
        subject: 'welcome on board',
        templateName: 'forgotpassword'
    },    
}