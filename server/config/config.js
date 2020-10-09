module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST, //"" <- Use this value when running locally
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "",
    dialect: "postgres",
  },
  production: {
    username: process.env.AZURE_POSTGRES_USER,
    password: process.env.AZURE_POSTGRES_PASSWORD,
    database: process.env.AZURE_POSTGRES_DB,
    host: process.env.AZURE_POSTGRES_HOST,
    port: process.env.AZURE_POSTGRES_PORT,
    dialect: "postgres",
  },
};
