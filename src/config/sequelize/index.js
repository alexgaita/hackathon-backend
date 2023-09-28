const { Sequelize } = require('sequelize')
const cls = require('cls-hooked')

const transactionNamespace = cls.createNamespace('transactional')

Sequelize.useCLS(transactionNamespace)
module.exports = new Sequelize(
    'postgres',
    'postgres',
    'postgres',
    {
        port: 5432,
        dialect: 'postgres',
       
        host: 'localhost',
        pool: {
            max: 1,
            min: 1,
            idle: 1500
        }
    })
