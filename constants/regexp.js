module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    EMAIL_REGEXP: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEXP: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),

    IMAGE_MIMETYPE: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/pjpeg'
    ],

    IMAGE_MAX_SIZE: 20 * 1024 * 1024 //20mb
}