import { uploadFileToS3 } from '../services/s3Service.js'

// src/controllers/userController.js
export async function post(req, res) {
    const { caption, location, isPrivate } = req.body
    const file = req.file

    if (!file) {
        return res.status(400).send('File is required.')
    }

    try {
        const fileUrl = await uploadFileToS3(file)
        const post = await req.context.prisma.post.create({
            data: {
                file: fileUrl,
                caption,
                location,
                isPrivate,
                authorId: req.user.id,
            },
        })
        res.json(post)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error creating post')
    }
}
