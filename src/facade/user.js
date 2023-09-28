const { userLogic } = require('../logic')
const utils = require('../utils')

module.exports = {
    create: async payload => {
        const { password, ...restOfPayload } = payload
        const newPassword = await utils.generateHash(password)
        const result = await userLogic.create({ ...restOfPayload, password: newPassword })

        return result
    },
    findAndCountAll: async () => {
        const result = await userLogic.findAndCountAll()

        return result
    },
    edit: async (id, data) => {
        const result = await userLogic.edit({ id }, { ...data })

        return result
    },
    findById: async (id) => {
        const result = await userLogic.findOne({ id })
        return result
    },
    delete: async (id) => {
        const result = await userLogic.delete({ id })
        return result
    }
}