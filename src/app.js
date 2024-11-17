import { startServer } from './server.js'

const PORT = process.env.PORT || 3000

;(async () => {
    try {
        await startServer(PORT)
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1) // Exit the process with an error code
    }
})()
