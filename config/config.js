require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT, 
    
    SYSTEM_MAIL: process.env.SYSTEM_MAIL,
    SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD,

    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,

    S3_BUCKET: process.env.S3_BUCKET,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY
}