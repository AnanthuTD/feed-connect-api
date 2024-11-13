import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { Comment } from './comment.js'
import { Like, LikeQueries } from './like.js'
import { Post, PostMutation } from './post.js'
import { User, UserQueries } from './user.js'
import NexusPrismaScalars from 'nexus-prisma/scalars'

export default [
    NexusPrismaScalars,
    User,
    UserQueries,
    Post,
    PostMutation,
    GraphQLUpload,
    Comment,
    Like,
    LikeQueries,
]
