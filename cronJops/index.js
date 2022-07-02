const cron = require('node-cron')

const removeOldTokens = require('./removeOldTokenCron')

module.exports = () => {
    cron.schedule('0 * * * *', removeOldTokens)
}