import { env } from '../env/env.js'
import { s3Client } from './s3Client.js'
import { Upload } from '@aws-sdk/lib-storage'

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

    const upload = new Upload({
        client: s3Client,
        params: uploadParams,
    })

    try {
        await upload.done()
        return `https://${env.S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${uniqueFileName}`
    } catch (error) {
        console.error('Failed to upload file:', error)
        throw error
    }
}
