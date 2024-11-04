import express, { urlencoded, static as expressStatic, json } from 'express'
import router from './routes'

import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3000

app.use(urlencoded({ extended: true }))
app.use(expressStatic('public'))
app.use(cookieParser())
app.use(json())

app.use('/', router)

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
})
