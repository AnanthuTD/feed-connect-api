import { extendType, objectType, stringArg } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

const User = objectType({
    name: np.User.$name,
    description: np.User.$description,
    definition(t) {
        t.field(np.User.id)
        t.field(np.User.username)
        t.field(np.User.fullName)
        t.field(np.User.email)
        t.field(np.User.avatar)
        t.list.field(np.User.comments)
        t.field(np.User.posts)
        t.list.field(np.User.likes)
        t.list.field(np.User.followedBy)
        t.list.field(np.User.following)
        t.field(np.User.createdAt)
        t.field('postCount', {
            type: 'Int',
            resolve(parent, _, ctx) {
                return ctx.prisma.post.count({ where: { authorId: parent.id } })
            },
        })
        t.field(np.User.bio)
    },
})

const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.field('user', {
            type: 'User',
            resolve: async (_parent, _args, context) => {
                ensureAuthenticated(context)

                const user = await context.prisma.user.findFirst({
                    where: { id: context.user.id },
                })

                if (!user) {
                    throw new Error('User not found')
                }

                return user
            },
        })
        t.field('userProfile', {
            type: 'User',
            args: { username: stringArg() },
            resolve: async (_parent, args, context) => {
                const user = await context.prisma.user.findFirst({
                    where: { username: args.username },
                })

                if (!user) {
                    throw new Error('User not found')
                }

                return user
            },
        })
    },
})

export { User, UserQueries }
