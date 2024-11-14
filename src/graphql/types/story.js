import { objectType, extendType, nonNull, stringArg, list } from 'nexus'
import np from 'nexus-prisma'
import { ensureAuthenticated } from '../ensureAuthenticated.js'
import { uploadFileToS3 } from '../../services/s3Service.js'

export const Story = objectType({
    name: np.Story.$name,
    description: np.Story.$description,
    definition(t) {
        t.field(np.Story.id)
        t.field(np.Story.caption)
        t.field(np.Story.fileUrl)
        t.field(np.Story.hashTag)
        t.field(np.Story.location)
        t.field(np.Story.mentions)
        t.field(np.Story.author)
    },
})

export const StoryMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createStory', {
            type: 'Story',
            args: {
                file: nonNull('Upload'),
                caption: stringArg(),
                hashTag: list('String'),
                mentions: list('String'),
                location: stringArg(),
            },
            async resolve(
                _,
                { file, caption, hashTag, mentions, location },
                ctx
            ) {
                ensureAuthenticated(ctx)

                const fileUrl = await uploadFileToS3(file)
                const userId = ctx.user.id

                return ctx.prisma.story.create({
                    data: {
                        fileUrl,
                        caption,
                        location,
                        hashTag,
                        authorId: userId,
                        mentions,
                    },
                })
            },
        })
    },
})
