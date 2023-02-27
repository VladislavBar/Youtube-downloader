module.exports = (req, res, next) => {
  res.sendStream = (stream) => {
    const chunks = []
    let size = 0
    stream.on('data', (chunk) => {
      chunks.push(chunk)
      size += chunk.length
    })

    stream.on('end', () => {
      const data = Buffer.concat(chunks, size)

      res.setHeader('Content-Disposition', 'Attachment')
      res.setHeader('Content-Length', size)
      res.write(data)
      res.end()
    })
  }

  console.log(res.sendStream)
  next()
}
