// src/services/s3Service.js
import { s3Client } from './s3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import env from '../env/env'

export async function uploadFileToS3(file) {
    const { createReadStream, filename, mimetype } = await file
    const fileStream = createReadStream()
    const uniqueFileName = `${Date.now()}_${filename}`

    const uploadParams = {
        Bucket: env.S3_BUCKET_NAME,
        Key: uniqueFileName,
        Body: fileStream,
        ContentType: mimetype,
        ACL: 'public-read',
    }

    await s3Client.send(new PutObjectCommand(uploadParams))
    return `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${uniqueFileName}`
}
