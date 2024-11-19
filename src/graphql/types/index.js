import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { Comment } from './comment.js'
import { Like, LikeQueries } from './like.js'
import { Post, PostConnection, PostMutation, PostQuery } from './post.js'
import { User, UserQueries } from './user.js'
import NexusPrismaScalars from 'nexus-prisma/scalars'
import { Story, StoryConnection, StoryMutation, StoryQuery } from './story.js'
import {
    Message,
    MessageSubscription,
    MessageMutation,
    MessageQuery,
    MessageConnection,
} from './message.js'
import { Conversation, ConversationQuery } from './conversation.js'

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
    Story,
    StoryMutation,
    StoryQuery,
    StoryConnection,
    Message,
    Conversation,
    MessageSubscription,
    MessageMutation,
    ConversationQuery,
    MessageQuery,
    MessageConnection,
]
