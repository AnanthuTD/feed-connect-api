import {
    objectType,
    extendType,
    nonNull,
    stringArg,
    booleanArg,
    intArg,
} from 'nexus'
import np from 'nexus-prisma'
import { uploadFileToS3 } from '../../services/s3Service.js'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

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
                file: nonNull('Upload'),
                caption: stringArg(),
                location: stringArg(),
                isPrivate: booleanArg(),
            },
            async resolve(_, { file, caption, location, isPrivate }, ctx) {
                ensureAuthenticated(ctx)

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

const PostQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('getPosts', {
            type: 'PostConnection',
            args: {
                take: intArg(), // Number of posts to fetch
                skip: intArg(), // Number of posts to skip
            },
            async resolve(_, { take = 10, skip = 0 }, ctx) {
                ensureAuthenticated(ctx)

                const posts = await ctx.prisma.post.findMany({
                    skip,
                    take,
                    where: {
                        isPrivate: false, // Show only public posts
                    },
                    orderBy: {
                        createdAt: 'desc', // Newest posts first
                    },
                    include: {
                        author: true,
                        comments: true,
                        likes: true,
                    },
                })

                const totalCount = await ctx.prisma.post.count({
                    where: { isPrivate: false },
                })

                return {
                    posts,
                    totalCount,
                    hasMore: skip + take < totalCount,
                }
            },
        })
    },
})

const PostConnection = objectType({
    name: 'PostConnection',
    definition(t) {
        t.list.field('posts', { type: 'Post' }) // The posts
        t.int('totalCount') // Total number of posts
        t.boolean('hasMore') // Whether more posts are available
    },
})

export { Post, PostMutation, PostQuery, PostConnection }
