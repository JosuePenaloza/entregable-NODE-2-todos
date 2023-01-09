const Users = require("./users.models");
const Tasks = require("./tasks.models");
const TaskCategories = require("./task_categories.models");
const Categories = require("./categories.models");
const Addresses = require("./addresses.models");

const initModels = () => {
    // Relacion uno a uno entre usuarios y direcciones
    Addresses.belongsTo(Users, { as: "resident", foreignKey: "user_id" });
    Users.hasOne(Addresses, { ass: "home", foreignKey: "user_id" });

    // relacion uno a mucho entre usuarios y tareas
    Tasks.belongsTo(Users, { as: "author", foreignKey: "user_id" });
    Users.hasMany(Tasks, { as: "todos", foreignKey: "user_id" })

    // relacion muchos a muchos entre tareas y categorias

    // recuerda que esta relación se consigue haciendo 
    // uno a muchos entre tareas y tabla pivote
    TaskCategories.belongsTo(Categories, { as: "category", foreignKey: "category_id" });
    Categories.hasMany(TaskCategories, { as: "todos", foreignKey: "category_id" });

    // uno a muchos entre categorias y tabla pivote
    TaskCategories.belongsTo(Tasks, { as: "todos", foreignKey: "task_id" });
    Tasks.hasMany(TaskCategories, { as: "categories", foreignKey: "task_id" });
};

module.exports = initModels;