const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const CONSTANTS = require('../utils/constants')

module.exports = {
    generateToken: (payload) => jwt.sign({ ...payload }, CONSTANTS.JWT_SECRET),
    generateHash: async password => {
        const hashedPassword = await bcrypt.hash(password, 11)

        return hashedPassword
    },
    compareHash: async (password, hashedPassword) => {
        const result = await bcrypt.compare(password, hashedPassword)

        return result
    }
}
