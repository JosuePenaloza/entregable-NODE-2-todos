const express = require("express");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const Users = require("./models/users.models");
const Tasks = require("./models/tasks.models");

const PORT = 8000;

db.authenticate()
  .then(() => console.log("Autenticación exitosa"))
  .catch((error) => console.log(error));


db.sync({alter: true})
    .then(() => console.log("Base sicronizada"))
    .catch((error) => console.log(error));

initModels()

const app = express()
app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({message: "Bienbenido"})
})


///////////////////////USERS////////////////////

// consultar todos los usuaios con ".findAll()"...  es como decir ... SELECT * FROM users;
app.get("/users", async (req, res) => {
    try {
        const result = await Users.findAll({
            attributes: ['id', 'username', 'email'],
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

    // app.get('/api/v1/users/:email', async (req, res) => {
    // 	try{
    // 		const {email} = req.params;
    // 		const result = await Users.findOne({
    // 			where: {email},
    //          attributes: ["id", "username", "email"],
    // 		});
    // 		res.status(200).json(result);
    // 	} catch (error) {
    // 		console.log(error);
    // 	}
    // });


app.get("/users/:id", async (req, res) => {
    try {
          const { id } = req.params;
          const result = await Users.findByPk(id,{
            attributes: ["id", "username", "email"],
          });
          res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  });

  // Crear usuario, es como decir.... INSERT INTO users (username, email, password) 
 //                                    VALUES ('Ian Rosas', 'ian@gmail.com', '1234');
app.post("/users", async (req, res) => {
    try {
        const newUser = req.body;
        const result = await Users.create(newUser);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        // obtener el id, "saber de que usuario deseas actulizar informacion gracias al id"
        const {id} = req.params;

        // obtener la informacion que se quiere actualizar 
        const data = req.body;

        //mandar la informacion actualizada
        const result = await Users.update(data, {
            where: {id},
        });

        //mostrar la informacion actualiz
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Users.destroy({where: {id}});
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});


///////////////////////TASKS////////////////

app.get("/todos", async (req, res) => {
    try {
        const result = await Tasks.findAll({
            attributes: {
                exclude: ["id"]
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});


app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Tasks.findByPk(id,{
            attributes: {
                exclude: ["userId", "user_id"]
            }
        });
        res.status(200).json(result);   
    } catch (error) {
        console.log(error);
    }
});

app.post('/todos', async (req, res) =>{
    try {
        const {id} = req.params;    
        const newTasks = req.body;
        const result = await Tasks.create({newTasks , id});    
        res.status(201).json(result);   
    } catch (error) {
        console.log(error);
    }
});

app.put("todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const data = req.body;
        const result = await Tasks.update(data, {
            where: {id}
        });
        res.status(200).json(result);   
    } catch (error) {
        console.log(error);
    }
});


app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Tasks.destroy({
            where: {id}
        });
        res.status(200).json(result);   
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});