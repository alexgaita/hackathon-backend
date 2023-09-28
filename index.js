const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const { createServer } = require('http')

process.env.NODE_ENV === 'dev' && require('dotenv').config()

const middlewares = require('./src/middlewares')
const routers = require('./src/router')

module.exports = {
  app: () => require('./src/config/sequelize/')
    .sync({ alter: true })
    .then(() => {
      const app = express()

      app.use('/api', logger('short'))
      app.use('/api', helmet())
      app.use('/api', cors())
      app.use('/api', bodyParser.json())
      app.use('/api', bodyParser.urlencoded({ extended: false }))

      app.use('/api/auth', routers.authRouter)

      app.use('/api/users', middlewares.authorisationHandler, routers.userRouter)

      app.use('/api', middlewares.notFoundHandler)
      app.use('/api', middlewares.errorHandler)

      const httpServer = createServer(app)

      return httpServer
    })
    .catch((e) => {
      console.error('e', e)
    })
}
