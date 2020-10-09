"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    `postgresql://${process.env.AZURE_POSTGRES_USER}:${process.env.AZURE_POSTGRES_PASSWORD}@${process.env.AZURE_POSTGRES_HOST}:${process.env.AZURE_POSTGRES_PORT}/${process.env.AZURE_POSTGRES_DB}`,
    {
      dialect: "postgres",
    }
  );
} else {
  sequelize = new Sequelize(
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    {
      dialect: "postgres",
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
