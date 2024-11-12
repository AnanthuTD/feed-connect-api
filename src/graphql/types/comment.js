import { objectType } from 'nexus'
import np from 'nexus-prisma'

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

export { Comment }
