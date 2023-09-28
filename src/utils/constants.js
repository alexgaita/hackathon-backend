module.exports = {
  PORT: process.env.PORT || 5001,
  JWT_EXPIRE_TIME: '30m',
  JWT_SECRET: process.env.JWT_SECRET || 'asdgakk1248asmdg',
  MAIL_SERVICE: {
    HOST: process.env.MAIL_HOST,
    SERVICE: process.env.MAIL_SERVICE,
    USER: process.env.MAIL_USER,
    PASSWORD: process.env.MAIL_USER_PASSWORD,
  },
  DATABASE: {
    NAMES: {
      USERS: 'Users',
      INPUTS: 'Inputs',
      RESPONSES: 'Responses',
      CALENDAR: 'Calendar',
      APARTMENTS: 'Apartments',
    },
  },
};
