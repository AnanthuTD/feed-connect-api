import { PubSub } from 'graphql-subscriptions'
import { objectType, extendType, stringArg, intArg } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

const pubsub = new PubSub()

// Message Object Type
export const Message = objectType({
    name: np.Message.$name,
    definition(t) {
        t.field(np.Message.id)
        t.field(np.Message.content)
        t.field(np.Message.conversation)
        t.field(np.Message.conversationId)
        t.field(np.Message.createdAt)
        t.field(np.Message.readBy)
        t.field(np.Message.senderId)
        t.field(np.Message.lastMessage)
    },
})

export const MessageQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('getMessages', {
            args: { receiverId: stringArg(), take: intArg(), skip: intArg() },
            type: 'MessageConnection', // Updated return type
            resolve: async (
                _,
                { receiverId, take, skip },
                { user, prisma }
            ) => {
                const conversation = await prisma.conversation.findFirst({
                    where: {
                        participantsId: { hasEvery: [receiverId, user.id] },
                    },
                })

                if (!conversation) {
                    return { messages: [], hasMore: false }
                }

                // Fetch messages with the given skip and take
                const messages = await prisma.message.findMany({
                    where: { conversationId: conversation.id },
                    orderBy: [{ createdAt: 'desc' }],
                    skip,
                    take: take + 1, // Fetch one extra message to check if there are more
                })

                // Determine if there are more messages
                const hasMore = messages.length > take

                // Remove the extra message (if fetched)
                if (hasMore) messages.pop()

                // Reverse the messages for chronological order
                return { messages: messages.reverse(), hasMore }
            },
        })
    },
})

export const MessageConnection = objectType({
    name: 'MessageConnection',
    definition(t) {
        t.list.field('messages', { type: 'Message' }) // Array of messages
        t.boolean('hasMore') // Indicates if more messages are available
    },
})

export const MessageMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('sendMessage', {
            type: 'Message',
            args: {
                receiverId: stringArg(),
                content: stringArg(),
            },
            resolve: async (_, { receiverId, content }, { user, prisma }) => {
                try {
                    // 1. Check if a conversation already exists
                    let conversation = await prisma.conversation.findFirst({
                        where: {
                            participantsId: { hasEvery: [receiverId, user.id] }, // Ensure both users are participants
                        },
                    })

                    // 2. Create a new conversation if none exists
                    if (!conversation) {
                        conversation = await prisma.conversation.create({
                            data: {
                                participantsId: [receiverId, user.id],
                            },
                        })
                    }

                    // 3. Create the message
                    const message = await prisma.message.create({
                        data: {
                            content: content,
                            conversationId: conversation.id,
                            senderId: user.id,
                        },
                    })

                    // 4. Update the last message in the conversation
                    await prisma.conversation.update({
                        where: { id: conversation.id },
                        data: {
                            lastMessageId: message.id,
                        },
                    })

                    console.log('message: ', message)

                    publishMessage({ receiverId, ...message })

                    // 5. Return the created message (Optional but useful for frontend updates)
                    return message
                } catch (error) {
                    console.error('Error in sending message:', error)
                    throw new Error('Failed to send message.')
                }
            },
        })
    },
})

// Subscription Type for Message
export const MessageSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.field({
            name: 'MessageSubscription',
            type: 'Message',
            subscribe: (_, __, ctx) => {
                ensureAuthenticated(ctx)

                console.log(ctx.user, 'Subscribed ==========')

                return pubsub.asyncIterableIterator([
                    `MESSAGE_RECEIVED_${ctx.user.id}`,
                ])
            },
            resolve: (payload) => {
                console.log('sending...', payload)
                return payload
            },
        })
    },
})

export const publishMessage = (message) => {
    if (!message || !message.receiverId) {
        throw new Error('Invalid message or missing receiverId')
    }

    try {
        pubsub.publish(`MESSAGE_RECEIVED_${message.receiverId}`, message)
        console.log('Message published:', message)
    } catch (error) {
        console.error('Error publishing message:', error)
        throw error
    }
}
