'use strict'

const express = require('express')

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.static(__dirname + '/public'))
app.listen(PORT, () => {
  console.log('\x1bc')
  console.log('Server listening on port', PORT)
})