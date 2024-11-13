import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import np from 'nexus-prisma'
import { uploadFileToS3 } from '../../services/s3Service.js'

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.field(np.Post.id)
        t.field(np.Post.author)
        t.list.field(np.Post.comments)
        t.list.field(np.Post.likes)
        t.field(np.Post.createdAt)
        t.field(np.Post.updatedAt)
        t.field(np.Post.caption)
        t.field(np.Post.location)
        t.field(np.Post.file)
        t.field(np.Post.isPrivate)
    },
})

const PostMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createPost', {
            type: 'Post',
            args: {
                file: nonNull('Upload'), // Upload scalar for handling file uploads
                caption: stringArg(),
                location: stringArg(),
                isPrivate: booleanArg(),
            },
            async resolve(_, { file, caption, location, isPrivate }, ctx) {
                const fileUrl = await uploadFileToS3(file)
                const userId = ctx.user.id

                return ctx.prisma.post.create({
                    data: {
                        file: fileUrl,
                        caption,
                        location,
                        isPrivate,
                        authorId: userId,
                    },
                })
            },
        })
    },
})

export { Post, PostMutation }
