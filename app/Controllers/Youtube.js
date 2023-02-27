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
    const downloadVideoStream = await YoutubeService.getDownloadVideoStream(link)
    return res.sendStream(downloadVideoStream)
  }
}

module.exports = new YoutubeController()
