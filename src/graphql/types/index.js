import { Comment } from './comment.js'
import { Like, LikeQueries } from './like.js'
import { Post } from './post.js'
import { User, UserQueries } from './user.js'
import NexusPrismaScalars from 'nexus-prisma/scalars'

export default [
    NexusPrismaScalars,
    User,
    UserQueries,
    Post,
    Comment,
    Like,
    LikeQueries,
]
