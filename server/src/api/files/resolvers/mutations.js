import httpErrors from '../../errors/index.js'
import { gcBucket } from '../../../server/gc-storage.js'

const resolvers = {
  Mutation: {
    uploadFile: async (root, args, req, info) => {
      const { createReadStream, filename } = await args.file.file

      console.log(args)
      console.log(args.file)
      console.log(filename)

      await new Promise(res =>
        createReadStream()
          .pipe(
            gcBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on('finish', res)
      )

      const imageUrl = `https://storage.googleapis.com/jd-cookbook-images/${filename}`

      return imageUrl
    }
  }
}

export default resolvers
