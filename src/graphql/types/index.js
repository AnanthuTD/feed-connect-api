import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { Comment, CommentMutations } from './comment.js'
import { Like, LikeQueries, LikeMutations } from './like.js'
import { Post, PostConnection, PostMutation, PostQuery } from './post.js'
import { User, UserQueries } from './user.js'
import NexusPrismaScalars from 'nexus-prisma/scalars'
import { Story, StoryConnection, StoryMutation, StoryQuery } from './story.js'

export default [
    NexusPrismaScalars,
    User,
    UserQueries,
    Post,
    PostMutation,
    PostQuery,
    PostConnection,
    GraphQLUpload,
    Comment,
    Like,
    LikeQueries,
    LikeMutations,
    Story,
    StoryMutation,
    StoryQuery,
    StoryConnection,
    CommentMutations,
]
