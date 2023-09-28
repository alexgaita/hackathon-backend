const { Calendar } = require('../config/sequelize/models');

module.exports = {
  create: (payload) => Calendar.create(payload),
  bulkCreate: (payload) => Calendar.bulkCreate(payload),
  findAndCountAll: (query, attributes) =>
    Calendar.findAndCountAll({ where: { ...query }, attributes }),
  count: (query) => Calendar.count({ where: { ...query } }),
  findOne: (options) => Calendar.findOne({ where: { ...options } }),
  delete: (options) => Calendar.destroy({ where: { ...options } }),
  edit: (options, payload) =>
    Calendar.update({ ...payload }, { where: { ...options } }),
};
