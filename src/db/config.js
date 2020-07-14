module.exports = {
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "ts_api",
    "host": "db",
    "dialect": "postgres",

  },
  "test": {
    "username": "postgres",
    "password": "root",
    "database": "ts-api-test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
