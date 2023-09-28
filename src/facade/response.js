const { responseLogic } = require('../logic')

module.exports = {
    create: async payload => {
        const result = await responseLogic.create(payload)

        return result
    },
    findAndCountAll: async () => {
        const result = await responseLogic.findAndCountAll()

        return result
    },
    edit: async (id, data) => {
        const result = await responseLogic.edit({ id }, { ...data })

        return result
    },
    findById: async (id) => {
        const result = await responseLogic.findOne({ id })
        return result
    },
    delete: async (id) => {
        const result = await responseLogic.delete({ id })
        return result
    }
}