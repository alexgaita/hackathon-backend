const {
  DATABASE: {
    NAMES: { RESPONSES },
  },
} = require('../../../utils/constants');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    RESPONSES,
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT({ length: 'long' }),
      },
    },
    {
      freezeTableName: true,
    }
  );
