const ytpl = require('ytpl')
const ytdl = require('ytdl-core')
const FfmpegCommand = require('fluent-ffmpeg')
const ImageService = require('../Services/Image')

class YoutubeService {
  static async getPlaylist(url) {
    const firstResult = await ytpl(url, { pages: 1 })
    let result = firstResult,
      videos = firstResult.items

    while (result.continuation) {
      result = await ytpl.continueReq(result.continuation)
      videos = [...videos, ...result.items]
    }

    return videos
  }

  static async getVideoInfo(url) {
    return ytdl.getInfo(url)
  }

  static async getDownloadVideoStream(url = 'https://www.youtube.com/watch?v=xGpJk3TSUi4') {
    const video = await YoutubeService.getVideoInfo(url)
    const videoStream = ytdl(url, { quality: 'highestaudio' })

    const imageUrl = video.videoDetails.thumbnails[0].url
    const imageBuffer = await ImageService.getImageBufferFromUrl(imageUrl)

    const through = require('through2')
    let counter = 0
    return FfmpegCommand({ source: videoStream })
      .addOutputOption('-b:a 320k')
      .addOutputOption('-id3v2_version 3')
      .toFormat('mp3')
      .pipe(
        through(function (chunk, enc, cb) {
          if (counter === 0) {
            const tags = {
              title: 'Tommorrow',
              APIC: imageBuffer,
              comment: {
                language: 'eng',
                text: 'I DID IT!!',
              },
              link: 'I DID IT!!',
              artist: 'Huh',
            }

            const NodeID3 = require('node-id3')
            const updated = NodeID3.update(tags, chunk)
            counter++
            this.push(updated)
            return cb()
          }
          this.push(chunk)
          cb()
        }),
        { end: true }
      )
  }
}

module.exports = YoutubeService
