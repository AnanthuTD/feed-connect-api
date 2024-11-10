import { startServer } from './server.js'

const PORT = process.env.PORT || 3000

startServer(PORT)
    .then(() => {
        console.log(`Server running on port: ${PORT}`)
    })
    .catch((error) => {
        console.error('Failed to start server:', error)
    })
