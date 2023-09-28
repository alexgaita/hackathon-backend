const {
  DATABASE: {
    NAMES: { INPUTS },
  },
} = require('../../../utils/constants');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    INPUTS,
    {
      content: {
        allowNull: false,
        type: DataTypes.TEXT({ length: 'long' }),
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      start: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      end: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      freezeTableName: true,
    }
  );
