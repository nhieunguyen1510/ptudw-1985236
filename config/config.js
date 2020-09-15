const config = {
  development: {
    username: 'postgres',
    password: null,
    database: 'aromadb',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: 'postgres'
  }
}

module.exports = config;
