const { Router } = require('express')
const YoutubeDownloader = require('./Youtube')

const rootRouter = Router({ mergeParams: true })
rootRouter.use('/youtube', YoutubeDownloader)

module.exports = rootRouter
