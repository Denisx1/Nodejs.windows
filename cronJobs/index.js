const cron = require('node-cron')

const removeOldTokens = require('./removeOldTokenCron')

module.exports = () => {
    cron.schedule('59 59 11 * * *', removeOldTokens)
}