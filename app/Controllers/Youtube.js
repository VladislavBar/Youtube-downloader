const YoutubeService = require('../Services/Youtube')
const link =
  'https://www.youtube.com/watch?v=WTwb-Y9TaPw&list=PLzHngS7cCPBT1HBBbx-iorhFofCi8h321&index=6'

class YoutubeController {
  async getPlaylist(req, res) {
    const playlist = await YoutubeService.getPlaylist(link)
    return res.json(playlist)
  }

  async getVideoInfo(req, res) {
    const video = await YoutubeService.getVideoInfo(link)
    return res.json(video)
  }

  async downloadVideo(req, res) {
    res.setHeader('Content-Disposition', 'Attachment')

    const downloadVideoStream = await YoutubeService.getDownloadVideoStream(link)
    return downloadVideoStream.pipe(res)
  }
}

module.exports = new YoutubeController()
