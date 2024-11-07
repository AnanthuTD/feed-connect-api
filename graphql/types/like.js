import { objectType } from 'nexus'

const Like = objectType({
    name: 'Like',
    definition(t) {
        t.id('id')
        /*   t.field('user', {
      type: 'User',
      resolve: (parent, _args, context) =>
        context.prisma.user.findUnique({
          where: { id: parent.userId },
        }),
    });
    t.field('post', {
      type: 'Post',
      resolve: (parent, _args, context) =>
        context.prisma.post.findUnique({
          where: { id: parent.postId },
        }),
    }); */
        t.field('createdAt', { type: 'DateTime' })
    },
})

export { Like }
