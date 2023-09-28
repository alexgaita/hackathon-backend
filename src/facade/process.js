const { getDataFromOpenAi } = require('../services/openAi');

module.exports = {
  processOpenAi: async (body) => {
    const { message } = body;
    if (!message) {
      let error = new Error('MESSAGE_EMPTY');
      error.status = 400;

      throw error;
    }

    const openAiResponse = await getDataFromOpenAi(message);

    if (openAiResponse.length === 0) {
      let error = new Error('UNKNOWN_RESPONSE');
      error.status = 400;

      throw error;
    }

    return {
      data: openAiResponse[0].message.content,
    };
  },
  validateMessage: async (body) => {
    const { message } = body;

    if (!message) {
      let error = new Error('MESSAGE_EMPTY');
      error.status = 400;

      throw error;
    }

    const openAiResponse = await getDataFromOpenAi(`
            Please transform this message
            ${message}
            into json format 
            Location: Location from the message,
            Start: Start from the message,
            End: End from the message,
            Price: Price as number
        `);

    if (openAiResponse.length === 0) {
      let error = new Error('UNKNOWN_RESPONSE');
      error.status = 400;

      throw error;
    }

    return {
      data: JSON.parse(openAiResponse[0].message.content),
    };
  },
};
