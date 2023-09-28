const { Input } = require('../config/sequelize/models')

module.exports = {
    create: payload => Input.create(payload),
    findAndCountAll: (query, attributes) => Input.findAndCountAll({ where: { ...query }, attributes }),
    count: (query) => Input.count({ where: { ...query } }),
    findOne: options => Input.findOne({ where: { ...options } }),
    delete: options => Input.destroy({ where: { ...options } }),
    edit: (options, payload) => Input.update({ ...payload }, { where: { ...options } })
}