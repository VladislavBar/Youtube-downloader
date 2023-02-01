const axios = require('axios')
const sharp = require('sharp')

class ImageService {
  static async getImageBufferFromUrl(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data, 'utf-8')
    return ImageService.resizeImage(buffer)
  }

  static async resizeImage(imageBuffer) {
    return sharp(imageBuffer).resize(300).toBuffer()
  }
}

module.exports = ImageService
