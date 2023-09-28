const { OpenAI } = require("openai");

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANISATION,
    apiKey: process.env.OPENAI_TOKEN,
});

module.exports = {
    getDataFromOpenAi: async (message) => {
        const chat = await openai.chat.completions.create({
            messages: [{
                role: 'user',
                content: message
            }],
            model: 'gpt-3.5-turbo'
        })

        return chat.choices
    }
}