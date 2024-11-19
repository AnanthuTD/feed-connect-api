import { extendType, objectType, stringArg, nonNull } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

const Like = objectType({
    name: 'Like',
    definition(t) {
        t.id('id')
        t.field(np.Like.user)
        t.field(np.Like.post)
        t.field(np.Like.createdAt)
    },
})

const LikeQueries = extendType({
    type: 'Query',
    definition(t) {
        t.field('like', {
            type: 'Like',
            args: { id: stringArg({ description: 'id of like' }) },
            resolve: (_parent, args, context) =>
                context.prisma.like.findUnique({
                    where: { id: args.id },
                }),
        })
    },
})

const LikeMutations = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('toggleLike', {
            type: 'Boolean',
            args: {
                postId: nonNull(stringArg()),
            },
            async resolve(_parent, { postId }, ctx) {
                ensureAuthenticated(ctx)

                const userId = ctx.user.id

                // Check if the like already exists
                const existingLike = await ctx.prisma.like.findFirst({
                    where: {
                        postId,
                        userId,
                    },
                })

                if (existingLike) {
                    // Remove the like
                    await ctx.prisma.like.delete({
                        where: { id: existingLike.id },
                    })
                    return false // Indicates the post is no longer liked
                } else {
                    // Add a new like
                    await ctx.prisma.like.create({
                        data: {
                            postId,
                            userId,
                        },
                    })
                    return true // Indicates the post is now liked
                }
            },
        })
    },
})

export { Like, LikeQueries, LikeMutations }
