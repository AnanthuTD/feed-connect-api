import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types/index.js'

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(process.cwd(), './generated/nexus-typegen.ts'),
        schema: join(process.cwd(), './generated/schema.graphql'),
    },
    contextType: {
        module: join(process.cwd(), './graphql/contextType.ts'),
        export: 'Context',
    },
})
