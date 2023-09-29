const dayjs = require('dayjs')
const { inputLogic, responseLogic, userLogic } = require('../logic')
const processFacade = require('./process')

module.exports = {
    create: async (payload, loggedUserId) => {
        const relatedUser = await userLogic.findOne({ id: loggedUserId })
        if (!relatedUser) {
            let error = new Error('USER_NOT_FOUND')
            error.status = 404

            throw error
        }

        const { content, price, location, start, end } = payload

        const input = await inputLogic.create({
            content,
            price,
            location,
            start: dayjs(start).format('YYYY-MM-DD'),
            end: dayjs(end).format('YYYY-MM-DD'),
            UserId: loggedUserId
        })

        const response = await processFacade.processOpenAi({ message: `${content} euro per night` })

        await responseLogic.create({ InputId: input.id, content: response.data })

        return response
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