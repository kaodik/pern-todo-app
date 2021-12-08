const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000;
const path = require("path"); //path is already there allows use to work with directory
//process.env.PORT
//process.env.NODE_ENV => production or undefined  indecats if app is in production or not

//middleware
app.use(cors());
app.use(express.json()); // => allow us to acces req.body

app.use(express.static(path.join(__dirname, "client/build")));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  //serve static content
  //npm run build  I need to run this command to make a build folder that will be used as the production
  //the GOAL is the aim to the index.html file
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

//Get all todos
app.get("/todo", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//Get todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const toDo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(toDo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Create todo
app.post("/todo", async (req, res) => {
  try {
    // test the post with thunder and this line of code  res.json(req.body)
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES" + "($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//Update todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});
//Delete todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server starting on port ${PORT}`);
});

//catchAll, serves user a page if the dir not found. this is optional
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
