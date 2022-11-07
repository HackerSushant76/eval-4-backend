const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();
const {
  signupController,
  loginController,
} = require("./controllers/user.controller");
const { Todo } = require("./models/todos.model");
const {
  gettodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todos.controller");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to my todo api");
});

app.post("/signup", signupController);

app.post("/login", loginController);

app.get("/todos", gettodos);

app.post("/todos/create", addTodo);

app.patch("/todos/:todoId", updateTodo);

app.delete("/todos/:todoId", deleteTodo);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening on port ${PORT}`);
});
