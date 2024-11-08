import { extendType, objectType, stringArg } from 'nexus'

const Like = objectType({
    name: 'Like',
    definition(t) {
        t.id('id')
        t.field('user', {
            type: 'User',
            resolve: (parent, _args, context) =>
                context.prisma.user.findUnique({
                    where: { id: parent.userId },
                }),
        })
        t.field('post', {
            type: 'Post',
            resolve: (parent, _args, context) =>
                context.prisma.post.findUnique({
                    where: { id: parent.postId },
                }),
        })
        t.string('createdAt')
    },
})

const LikeQueries = extendType({
    type: 'Query',
    definition(t) {
        t.field('like', {
            type: 'Like',
            args: { id: stringArg('id of like') },
            resolve: (_parent, args, context) =>
                context.prisma.like.findUnique({
                    where: { id: args.id },
                }),
        })
    },
})

export { Like, LikeQueries }
