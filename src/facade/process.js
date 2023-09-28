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

        // TODO: Save message to questions and response to responses

        if (openAiResponse.length === 0) {
            let error = new Error('UNKNOWN_RESPONSE')
            error.status = 400

            throw error
        }

        return {
            data: openAiResponse[0].message.content
        }
    },
}