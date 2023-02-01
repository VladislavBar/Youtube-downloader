const { Router } = require('express')
const YoutubeController = require('../app/Controllers/Youtube')

const youtubeRouter = Router({ mergeParams: true })

youtubeRouter.get('/playlist', YoutubeController.getPlaylist)
youtubeRouter.get('/download', YoutubeController.downloadVideo)
youtubeRouter.get('/info', YoutubeController.getVideoInfo)

module.exports = youtubeRouter
