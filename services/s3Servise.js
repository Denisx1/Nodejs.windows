const AWS_S3 = require('aws-sdk/clients/s3')
const path = require('path')
const { v4 } = require('uuid')

const { S3_BUCKET, S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY } = require('../config/config')

const s3 = new AWS_S3({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    sifnatureVersion: 'v4',
    region: S3_BUCKET_REGION
})

const uploadFile = async (fileToUpload, itemType, itemId) =>{

    const Key = _buildFilePath(itemType, itemId, fileToUpload.name)

    await s3.upload({
        // ACL: 'publick read',
        Bucket: S3_BUCKET,
        Body: fileToUpload.data,
        Key,
    }).promise()

    const signUrl = s3.getSignedUrl('getObject',{
        Bucket:S3_BUCKET,
        Key
    })

    return signUrl
}


const getPhoto = async ()=>{
    await s3.getObject({
        Bucket: S3_BUCKET,
        Key
    })
}

function _buildFilePath(itemType, itemId, fileName){

    // const extension = path.extname(fileName) //.jpg
    const ext = fileName.split('.').pop()  //jpg

    return path.normalize(`${itemType}/${itemId}/${v4()}.${ext}`)
}


module.exports = {
    uploadFile,
    getPhoto
}