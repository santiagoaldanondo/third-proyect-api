require('dotenv').config()
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const apollo_server_express = require('apollo-server-express')

require('./configs/db.config')
const corsConfig = require('./configs/cors.config')

const apiRoutes = require('./routes/api.routes')

const app = express()

app.use(cors(corsConfig))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

const apiPrefix = process.env.API_PREFIX
app.use(apiPrefix, apiRoutes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  if (err instanceof mongoose.Error.ValidationError) {
    err.status = 400
  }
  res.status(err.status || 500)
  res.json({
    message: err.message
  })
})

module.exports = app
