import dotenv from 'dotenv'
import { initServer } from './server/build-app.js'
import mongoose from 'mongoose'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: join(__dirname, `../env/${process.env.NODE_ENV}.env`)
})

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    dbName: 'cookbook'
  },
  async () => {
    console.log('DATABASE CONNECTION SUCESSFULL')
    console.log('Starting server...')
    const server = initServer()
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  }
)
