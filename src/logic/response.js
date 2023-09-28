const { responseRepository } = require('../repository')

module.exports = {
    create: async payload => {
        const result = await responseRepository.create(payload)

        return result
    },
    findAndCountAll: async (query) => {
        const result = await responseRepository.findAndCountAll(query)

        return result
    },
    count: async (query) => {
        const result = await responseRepository.count(query)

        return result
    },
    findOne: async options => {
        const result = await responseRepository.findOne(options)

        return result
    },
    delete: async options => {
        const result = await responseRepository.delete(options)

        return result
    },
    edit: async (options, payload) => {
        const result = await responseRepository.edit(options, payload)

        return result
    }
}