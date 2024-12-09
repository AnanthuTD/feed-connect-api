import { extendType, objectType, stringArg } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'

export const Conversation = objectType({
    name: np.Conversation.$name,
    definition(t) {
        t.field(np.Conversation.id)
        t.field(np.Conversation.lastActivityAt)
        t.field(np.Conversation.lastMessage)
        t.field(np.Conversation.messages)
        t.field(np.Conversation.participants)
        t.field(np.Conversation.participantsId)
        t.field('participant', {
            type: 'User',
            resolve(parent, _, ctx) {
                const otherParticipant = parent.participantsId.find(
                    (participantId) => participantId !== ctx.user.id
                )
                return ctx.prisma.user.findFirst({
                    where: { id: otherParticipant },
                })
            },
        })
    },
})

export const ConversationQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('conversations', {
            type: 'Conversation',
            resolve: async (_, __, { user, prisma }) => {
                ensureAuthenticated({ user })
                try {
                    const conversations = await prisma.conversation.findMany({
                        where: {
                            participantsId: { has: user.id },
                        },
                    })

                    return conversations
                } catch (error) {
                    console.log(error)
                    return []
                }
            },
        })
        t.field('conversation', {
            type: 'Conversation',
            args: { conversationId: stringArg() },
            resolve: async (_, { conversationId }, { user, prisma }) => {
                ensureAuthenticated({ user })
                try {
                    const conversation = await prisma.conversation.findFirst({
                        where: {
                            id: conversationId,
                        },
                    })

                    return conversation
                } catch (error) {
                    console.log(error)
                    return null
                }
            },
        })
    },
})
