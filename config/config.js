require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,

    ACCESS_TOKEN_SECRET: 'TOKEN_SECRET',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN',
    ACTION_TOKEN_SECRET: 'ACTION_TOKEN'
}