const { apartmentRepository } = require('../repository');

module.exports = {
  bulkCreate: async (payload) => {
    const result = await apartmentRepository.bulkCreate(payload);

    return result;
  },
  create: async (payload) => {
    const result = await apartmentRepository.create(payload);

    return result;
  },
  findAndCountAll: async (query) => {
    const result = await apartmentRepository.findAndCountAll(query);

    return result;
  },
  count: async (query) => {
    const result = await apartmentRepository.count(query);

    return result;
  },
  findOne: async (options) => {
    const result = await apartmentRepository.findOne(options);

    return result;
  },
  delete: async (options) => {
    const result = await apartmentRepository.delete(options);

    return result;
  },
  edit: async (options, payload) => {
    const result = await apartmentRepository.edit(options, payload);

    return result;
  },
};
