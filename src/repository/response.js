const { Response } = require('../config/sequelize/models')

module.exports = {
    create: payload => Response.create(payload),
    findAndCountAll: (query, attributes) => Response.findAndCountAll({ where: { ...query }, attributes }),
    count: (query) => Response.count({ where: { ...query } }),
    findOne: options => Response.findOne({ where: { ...options } }),
    delete: options => Response.destroy({ where: { ...options } }),
    edit: (options, payload) => Response.update({ ...payload }, { where: { ...options } })
}