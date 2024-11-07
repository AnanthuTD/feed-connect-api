import { objectType } from 'nexus'

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.id('id')
        t.string('content')
        t.nonNull.string('imageUrl')
        /*     t.field('author', {
      type: 'User',
      resolve: (parent, _args, context) =>
        context.prisma.user.findUnique({
          where: { id: parent.authorId },
        }),
    });
    t.list.field('comments', {
      type: 'Comment',
      resolve: (parent, _args, context) =>
        context.prisma.comment.findMany({
          where: { postId: parent.id },
        }),
    });
    t.list.field('likes', {
      type: 'Like',
      resolve: (parent, _args, context) =>
        context.prisma.like.findMany({
          where: { postId: parent.id },
        }),
    }); */
        t.field('createdAt', { type: 'DateTime' })
        t.field('updatedAt', { type: 'DateTime' })
    },
})

export { Post }
