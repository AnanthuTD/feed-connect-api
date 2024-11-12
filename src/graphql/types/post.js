import { objectType } from 'nexus'
import np from 'nexus-prisma'

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.id('id')
        t.string('content')
        t.nonNull.string('imageUrl')
        t.field(np.Post.author)
        t.list.field(np.Post.comments)
        t.list.field(np.Post.likes)
        t.field(np.Post.createdAt)
        t.field(np.Post.updatedAt)
    },
})

export { Post }
