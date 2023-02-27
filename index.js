const express = require('express')
const cors = require('cors')
const router = require('./routers')
const responseExtension = require('./app/Middlewares/sendStream')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(responseExtension)
app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
