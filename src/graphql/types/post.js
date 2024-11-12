import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import { uploadFileToS3 } from '../services/s3Service'

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.id('id')
        t.string('content')
        t.nonNull.string('imageUrl')
        t.string('file') // URL of file (image or video) in S3
        t.string('caption')
        t.string('location')
        t.boolean('isPrivate') // Renamed to 'isPrivate'
        t.field('author', {
            type: 'User',
            resolve: (parent, _args, context) =>
                context.prisma.user.findUnique({
                    where: { id: parent.authorId },
                }),
        })
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent, _args, context) =>
                context.prisma.comment.findMany({
                    where: { postId: parent.id },
                }),
        })
        t.list.field('likes', {
            type: 'Like',
            resolve: (parent, _args, context) =>
                context.prisma.like.findMany({
                    where: { postId: parent.id },
                }),
        })
        t.string('createdAt')
        t.string('updatedAt')
    },
})

// Mutation to create a new post
export const PostMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createPost', {
            type: 'Post',
            args: {
                file: nonNull('Upload'), // Handling file upload
                caption: stringArg(),
                location: stringArg(),
                isPrivate: booleanArg(), // Updated to 'isPrivate'
            },
            async resolve(_, { file, caption, location, isPrivate }, ctx) {
                // Updated to 'isPrivate'
                // Upload file to S3 and get URL
                const fileUrl = await uploadFileToS3(file)

                const userId = ctx.user.id // Assumes user ID is added to context by authentication middleware

                // Create the post in the database using Prisma
                const post = await ctx.prisma.post.create({
                    data: {
                        file: fileUrl,
                        caption,
                        location,
                        isPrivate, // Updated to 'isPrivate'
                        userId,
                    },
                })

                return post
            },
        })
    },
})

export { Post }
