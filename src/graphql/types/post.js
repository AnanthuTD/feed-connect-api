// src/graphql/types/post.js
import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import { uploadFileToS3 } from '../services/s3Service'

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.id('id')
        t.string('caption')
        t.string('location')
        t.string('file') // URL of the file in S3
        t.boolean('isPrivate')
        t.string('createdAt')
        t.string('updatedAt')
        t.field('author', {
            type: 'User',
            resolve: (parent, _args, context) =>
                context.prisma.user.findUnique({
                    where: { id: parent.authorId },
                }),
        })
    },
})

export const PostMutation = extendType({
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

export { Post }
