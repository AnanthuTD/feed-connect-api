import {
    S3Client,
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '../env/env.js'

export const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
})

// Helper function to delete an object from S3
export async function deleteFromS3(bucket, key) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        })
        await s3Client.send(command)
    } catch (error) {
        console.error(`Error deleting file ${key} from S3:`, error)
        throw new Error(`Failed to delete file: ${key}`)
    }
}

// Helper function to get a presigned URL for an object in S3
export async function getPresignedUrl(bucketName, key, expiresIn = 3600) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    })

    return getSignedUrl(s3Client, command, { expiresIn }) // Expires in 1 hour
}

// Helper function to upload an object to S3
export async function uploadToS3(bucket, key, body, contentType) {
    try {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: contentType,
        })
        await s3Client.send(command)
        console.log(`File ${key} uploaded successfully.`)
    } catch (error) {
        console.error(`Error uploading file ${key} to S3:`, error)
        throw new Error(`Failed to upload file: ${key}`)
    }
}
