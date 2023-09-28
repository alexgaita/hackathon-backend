const { inputLogic } = require('../logic')

module.exports = {
    create: async payload => {
        const result = await inputLogic.create(payload)

        return result
    },
    findAndCountAll: async () => {
        const result = await inputLogic.findAndCountAll()

        return result
    },
    edit: async (id, data) => {
        const result = await inputLogic.edit({ id }, { ...data })

        return result
    },
    findById: async (id) => {
        const result = await inputLogic.findOne({ id })
        return result
    },
    delete: async (id) => {
        const result = await inputLogic.delete({ id })
        return result
    }
}