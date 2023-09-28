const Sequelize = require('sequelize');
const connection = require('..');

const UserModel = require('./user');
const CalendarModel = require('./calendar');
const InputModel = require('./inputs');
const ResponseModel = require('./responses');
const ApartmentModel = require('./apartments');

const User = UserModel(connection, Sequelize);
const Calendar = CalendarModel(connection, Sequelize);
const Input = InputModel(connection, Sequelize);
const Response = ResponseModel(connection, Sequelize);
const Apartment = ApartmentModel(connection, Sequelize);

User.hasMany(Input);
Input.hasOne(Response);
Apartment.hasMany(Calendar);

module.exports = {
  User,
  Calendar,
  Input,
  Response,
  Apartment,
};
