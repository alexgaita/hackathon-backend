const {
  DATABASE: {
    NAMES: { APARTMENTS },
  },
} = require('../../../utils/constants');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    APARTMENTS,
    {
      link: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
