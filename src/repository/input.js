const { Input } = require('../config/sequelize/models')

module.exports = {
    create: payload => Input.create(payload),
    findAndCountAll: (query, {limit, order}) => Input.findAndCountAll({ where: { ...query }, limit, order}),
    count: (query) => Input.count({ where: { ...query } }),
    findOne: options => Input.findOne({ where: { ...options } }),
    delete: options => Input.destroy({ where: { ...options } }),
    edit: (options, payload) => Input.update({ ...payload }, { where: { ...options } })
}