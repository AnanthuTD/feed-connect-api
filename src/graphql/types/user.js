import { extendType, objectType } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

const User = objectType({
    name: np.User.$name,
    description: np.User.$description,
    definition(t) {
        t.field(np.User.id)
        t.string('username')
        t.string('email')
        t.field(np.User.avatar)
        t.list.field(np.User.comments)
        t.list.field(np.User.posts)
        t.list.field(np.User.likes)
        t.list.field(np.User.followedBy)
        t.list.field(np.User.following)
        t.field(np.User.createdAt)
    },
})

const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.field('user', {
            type: 'User',
            resolve: async (_parent, _args, context) => {
                ensureAuthenticated(context)

                const user = await context.prisma.user.findUnique({
                    where: { id: context.user.id },
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
