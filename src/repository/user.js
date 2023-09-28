const { User } = require('../config/sequelize/models')

module.exports = {
    create: payload => User.create(payload),
    findAndCountAll: (query, attributes) => User.findAndCountAll({ where: { ...query }, attributes }),
    count: (query) => User.count({ where: { ...query } }),
    findOne: options => User.findOne({ where: { ...options } }),
    delete: options => User.destroy({ where: { ...options } }),
    edit: (options, payload) => User.update({ ...payload }, { where: { ...options } })
}