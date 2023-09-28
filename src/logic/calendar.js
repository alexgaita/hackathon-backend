const { calendarRepository } = require('../repository');

module.exports = {
  bulkCreate: async (payload) => {
    const result = await calendarRepository.bulkCreate(payload);

    return result;
  },
  create: async (payload) => {
    const result = await calendarRepository.create(payload);

    return result;
  },
  findAndCountAll: async (query) => {
    const result = await calendarRepository.findAndCountAll(query);

    return result;
  },
  count: async (query) => {
    const result = await calendarRepository.count(query);

    return result;
  },
  findOne: async (options) => {
    const result = await calendarRepository.findOne(options);

    return result;
  },
  delete: async (options) => {
    const result = await calendarRepository.delete(options);

    return result;
  },
  edit: async (options, payload) => {
    const result = await calendarRepository.edit(options, payload);

    return result;
  },
};
