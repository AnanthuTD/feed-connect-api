import { extendType, objectType, stringArg, nonNull } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

const Comment = objectType({
    name: 'Comment',
    definition(t) {
        t.id('id')
        t.string('content')
        t.field(np.Comment.author)
        t.field(np.Comment.post)
        t.field(np.Comment.createdAt)
    },
})

const CommentMutations = extendType({
    type: 'Mutation',
    definition(t) {
        // Add a comment
        t.field('addComment', {
            type: 'Comment',
            args: {
                postId: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve: async (_parent, { postId, content }, ctx) => {
                ensureAuthenticated(ctx)

                return ctx.prisma.comment.create({
                    data: {
                        content,
                        postId,
                        authorId: ctx.user.id,
                    },
                })
            },
        })

        // Edit a comment
        t.field('editComment', {
            type: 'Comment',
            args: {
                commentId: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve: async (_parent, { commentId, content }, ctx) => {
                ensureAuthenticated(ctx)

                const comment = await ctx.prisma.comment.findUnique({
                    where: { id: commentId },
                })

                if (!comment || comment.authorId !== ctx.user.id) {
                    throw new Error(
                        "You don't have permission to edit this comment."
                    )
                }

                return ctx.prisma.comment.update({
                    where: { id: commentId },
                    data: { content },
                })
            },
        })

        // Delete a comment
        t.field('deleteComment', {
            type: 'Boolean',
            args: {
                commentId: nonNull(stringArg()),
            },
            resolve: async (_parent, { commentId }, ctx) => {
                ensureAuthenticated(ctx)

                const comment = await ctx.prisma.comment.findUnique({
                    where: { id: commentId },
                })

                if (
                    !comment ||
                    (comment.authorId !== ctx.user.id &&
                        comment.post.ownerId !== ctx.user.id)
                ) {
                    throw new Error(
                        "You don't have permission to delete this comment."
                    )
                }

                await ctx.prisma.comment.delete({
                    where: { id: commentId },
                })

                return true
            },
        })
    },
})

export { Comment, CommentMutations }
