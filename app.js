require('dotenv').config()
const express = require('express')
const path = require("path")
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const authorization = require('./auth/authorization')

require('./configs/db.config')
const corsConfig = require('./configs/cors.config')

const app = express()

app.use(cors(corsConfig))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, "public")));

app.use(authorization)

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({
    message: err.message
  })
})

module.exports = app
