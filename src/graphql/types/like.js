import { extendType, objectType, stringArg } from 'nexus'
import np from 'nexus-prisma'

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

export { Like, LikeQueries }
