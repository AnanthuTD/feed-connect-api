import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types/index.js'

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(
            process.cwd(),
            './src/graphql/generated/nexus-typegen.ts'
        ),
        schema: join(process.cwd(), './src/graphql/generated/schema.graphql'),
    },
    contextType: {
        module: join(process.cwd(), './src/graphql/contextType.ts'),
        export: 'Context',
    },
})
