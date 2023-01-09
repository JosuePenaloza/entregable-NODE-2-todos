const db = require("../utils/database");
const { DataTypes } = require("sequelize");
const Categories = require("./categories.models");
const Tasks = require("./tasks.models");

const TaskCategories = db.define(
  "task_categories",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categories,
        key: "id",
      },
      field: "category_id",
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tasks,
        key: "id",
      },
      field: "task_id",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = TaskCategories;