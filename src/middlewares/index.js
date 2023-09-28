const HTTP_STATUS = require('http-status')
const jwt = require('jsonwebtoken')

const CONSTANTS = require('../utils/constants')

module.exports = {
    notFoundHandler: (err, req, next) => {
        let error = new Error('Not found')
        error.status = HTTP_STATUS.NOT_FOUND
        next(error)
    },
    errorHandler: (err, req, res, next) => {
        console.error(err)

        return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.stack)
    },
    authorisationHandler: (req, res, next) => {
        if (!req.headers.authorization) {
            let error = new Error('Invalid header')
            error.status = HTTP_STATUS.UNAUTHORIZED

            return next(error)
        }

        let [bearer, token] = req.headers.authorization.split(' ')

        if (bearer !== 'Bearer') {
            let error = new Error('Invalid authorization type')
            error.status = HTTP_STATUS.UNAUTHORIZED

            return next(error)
        }

        try {
            let decodedToken = jwt.decode(token, CONSTANTS.JWT_SECRET)

            req.auth = decodedToken

            return next()
        } catch (e) {
            e.status = HTTP_STATUS.UNAUTHORIZED
            e.message = 'Unable to decode token'

            return next(e)
        }
    },
}