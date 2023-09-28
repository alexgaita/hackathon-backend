const { getDataFromOpenAi } = require('../services/openAi')

module.exports = {
    processOpenAi: async (body) => {
        const { message } = body
        if (!message) {
            let error = new Error('MESSAGE_EMPTY')
            error.status = 400

            throw error
        }

        const openAiResponse = await getDataFromOpenAi(message)

        if (openAiResponse.length === 0) {
            let error = new Error('UNKNOWN_RESPONSE')
            error.status = 400

            throw error
        }

        return {
            data: openAiResponse[0].message.content
        }
    },
    validateMessage: async (body) => {
        const { message } = body
        if (!message) {
            let error = new Error('MESSAGE_EMPTY')
            error.status = 400

            throw error
        }

        const openAiResponse = await getDataFromOpenAi(`
        Please transform this message
        ${message}
        into format 
        Location: Location from the message,
        Period: Period from the message,
        Price: Price from the period
        `)

        if (openAiResponse.length === 0) {
            let error = new Error('UNKNOWN_RESPONSE')
            error.status = 400

            throw error
        }

        const result = {
            location: '',
            period: '',
            price: ''
        }

        openAiResponse[0].message.content.split('\n').forEach(data => {
            const keyValue = data.split(':')
            result[keyValue[0].toLowerCase()] = keyValue[1]
        })

        return {
            data: result
        }
    },
}