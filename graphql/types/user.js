import { extendType, objectType, stringArg } from 'nexus'

const User = objectType({
    name: 'User',
    definition(t) {
        t.id('id')
        t.string('username')
        t.string('email')
        t.list.field('posts', {
            type: 'Post',
            resolve: (parent, _args, context) =>
                context.prisma.post.findMany({
                    where: { authorId: parent.id },
                }),
        })
        t.list.field('comments', {
            type: 'Comment',
            resolve: (parent, _args, context) =>
                context.prisma.comment.findMany({
                    where: { authorId: parent.id },
                }),
        })
        t.list.field('likes', {
            type: 'Like',
            resolve: (parent, _args, context) =>
                context.prisma.like.findMany({
                    where: { userId: parent.id },
                }),
        })
        t.list.field('followedBy', {
            type: 'User',
            resolve: (parent, _args, context) =>
                context.prisma.user.findMany({
                    where: { followingIDs: { has: parent.id } },
                }),
        })
        t.list.field('following', {
            type: 'User',
            resolve: (parent, _args, context) =>
                context.prisma.user.findMany({
                    where: { followedByIDs: { has: parent.id } },
                }),
        })
        t.string('createdAt')
    },
})

const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.field('user', {
            type: 'User',
            args: { id: stringArg('id of user') },
            resolve: (_parent, args, context) =>
                context.prisma.user.findUnique({
                    where: { id: args.id },
                }),
        })
    },
})

export { User, UserQueries }
