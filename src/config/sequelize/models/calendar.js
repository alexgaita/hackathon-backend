const {
  DATABASE: {
    NAMES: { CALENDAR },
  },
} = require('../../../utils/constants');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    CALENDAR,
    {
      date: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      available: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
    }
  );
