module.exports = {
    local: {
      port: process.env.DATABASE_PORT,
      dialect: process.env.DATABASE_DIALECT || 'postgres',
    },
    dev: {
      port: process.env.DATABASE_PORT,
      dialect: process.env.DATABASE_DIALECT || 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    },
  }
  