const { userRepository } = require('../repository')

module.exports = {
    create: async payload => {
        const result = await userRepository.create(payload)

        return result
    },
    findAndCountAll: async (query) => {
        const result = await userRepository.findAndCountAll(query)

        return result
    },
    count: async (query) => {
        const result = await userRepository.count(query)

        return result
    },
    findOne: async options => {
        const result = await userRepository.findOne(options)

        return result
    },
    delete: async options => {
        const result = await userRepository.delete(options)

        return result
    },
    edit: async (options, payload) => {
        const result = await userRepository.edit(options, payload)

        return result
    }
}