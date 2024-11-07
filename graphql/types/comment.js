import { objectType } from 'nexus'

const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.id('id')
        t.string('content')
        /*  t.field('author', {
      type: 'User',
      resolve: (parent, _args, context) =>
        context.prisma.user.findUnique({
          where: { id: parent.authorId },
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

export { Comment }
