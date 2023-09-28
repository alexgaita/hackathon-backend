const { Apartment } = require('../config/sequelize/models');

module.exports = {
  create: (payload) => Apartment.create(payload),
  bulkCreate: (payload) => Apartment.bulkCreate(payload),
  findAndCountAll: (query, attributes) =>
    Apartment.findAndCountAll({ where: { ...query }, attributes }),
  count: (query) => Apartment.count({ where: { ...query } }),
  findOne: (options) => Apartment.findOne({ where: { ...options } }),
  delete: (options) => Apartment.destroy({ where: { ...options } }),
  edit: (options, payload) =>
    Apartment.update({ ...payload }, { where: { ...options } }),
};
