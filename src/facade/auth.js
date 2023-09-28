const HTTP_STATUS = require('http-status')

const utils = require('../utils')
const { userLogic } = require('../logic')

module.exports = {
    login: async (email, password) => {
        const user = await userLogic.findOne({ email }, [])

        if (!user) {
            let error = new Error('Unauthorized')
            error.status = HTTP_STATUS.UNAUTHORIZED

            throw error
        }

        const passwordMatch = await utils.compareHash(password, user.password)

        if (!passwordMatch) {
            let error = new Error('Unauthorized')
            error.status = HTTP_STATUS.UNAUTHORIZED

            throw error
        }

        return {
            user: user.toJSON(),
            token: utils.generateToken(user.toJSON())
        }
    },
    registerUser: async (payload) => {
        const existingUserEmail = await userLogic.findOne({ email: payload.email }, [])
        if (existingUserEmail) {
            let error = new Error('EMAIL_EXISTS')
            error.status = HTTP_STATUS.BAD_REQUEST

            throw error
        }

        const generatedPassword = await utils.generateHash(payload.password)
        const user = await userLogic.create({
            ...payload,
            password: generatedPassword,
        })

        const token = utils.generateToken({
            ...user
        })

        return {
            user: user.toJSON(),
            token
        }
    },
}