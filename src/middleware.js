import { urlencoded, static as expressStatic, json } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import chalk from 'chalk'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

export function setupMiddleware(app) {
    // Colorful logging with morgan and chalk
    app.use(
        morgan((tokens, req, res) => {
            return [
                chalk.green(tokens.method(req, res)),
                chalk.yellow(tokens.url(req, res)),
                chalk.blue(tokens.status(req, res)),
                chalk.red(tokens['response-time'](req, res) + ' ms'),
            ].join(' ')
        })
    )

    app.use(urlencoded({ extended: true }))
    app.use(expressStatic('public'))
    app.use(cookieParser())
    app.use(json())
    // to upload multipart data using graphql
    app.use(graphqlUploadExpress())
}
