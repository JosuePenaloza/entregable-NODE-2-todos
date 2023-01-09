const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Users = require("./users.models");

const Address = db.define(
  "addresses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
      field: "user_id",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Address;