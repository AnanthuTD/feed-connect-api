import { cleanEnv, str, port, url } from 'envalid'

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'test', 'production', 'staging'],
    }),
    PORT: port(),
    MONGODB_URI: url(),

    // JWT secrets
    ACCESS_TOKEN_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),

    // S3 bucket
    AWS_ACCESS_KEY_ID: str(),
    AWS_SECRET_ACCESS_KEY: str(),
    AWS_REGION: str(),
    S3_BUCKET_NAME: str(),
})

export { env }
