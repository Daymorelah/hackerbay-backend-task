module.exports = {
  development: {
    username: 'postgres',
    password: 'andelabootcamp24',
    database: 'backend-task',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
  test: {
    username: 'postgres',
    password: 'andelabootcamp24',
    database: 'test2',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
