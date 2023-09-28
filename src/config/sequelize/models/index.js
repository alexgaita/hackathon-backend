const Sequelize = require('sequelize')
const connection = require('..')

const UserModel = require('./user')

const User = UserModel(connection, Sequelize)

module.exports = {
    User,
}