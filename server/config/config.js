export default {
  development: {
    username: 'postgres',
    password: 'andelabootcamp24',
    database: 'bakend-task',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
