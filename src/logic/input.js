const { inputRepository } = require('../repository')

module.exports = {
    create: async payload => {
        const result = await inputRepository.create(payload)

        return result
    },
    findAndCountAll: async (query, options) => {
        const result = await inputRepository.findAndCountAll(query, options)

        return result
    },
    count: async (query) => {
        const result = await inputRepository.count(query)

        return result
    },
    findOne: async options => {
        const result = await inputRepository.findOne(options)

        return result
    },
    delete: async options => {
        const result = await inputRepository.delete(options)

        return result
    },
    edit: async (options, payload) => {
        const result = await inputRepository.edit(options, payload)

        return result
    }
}