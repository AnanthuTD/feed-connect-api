import { extendType, objectType } from 'nexus'
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
    },
})
