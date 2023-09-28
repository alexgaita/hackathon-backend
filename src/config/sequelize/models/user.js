const { DATABASE: { NAMES: { USERS }} } = require('../../../utils/constants')

module.exports = (sequelize, DataTypes) => sequelize.define(USERS, {
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 6
        }
    },
}, {
    freezeTableName: true
})