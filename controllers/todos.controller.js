const { Todo } = require("../models/todos.model");

const gettodos = async(req,res)=>{
    const todos = await Todo.find()
    res.send(todos)
}

const addTodo =async(req,res)=>{
    const {taskname,status,tag} = req.body;
    const todo = new Todo({taskname,status,tag})
    await todo.save()
    res.send("todos added to db")
}


const updateTodo = async(req,res)=>{
    const {todoId} = req.params
    const data = await Todo.findById(todoId)
    await Todo.findByIdAndUpdate(todoId,{status : !data.status})
    res.send("todo updated");
}

const deleteTodo = async(req,res)=>{
    const {todoId} = req.params
    await Todo.findByIdAndDelete(todoId)
    res.send("todo deleted");
}

module.exports = {gettodos, addTodo,updateTodo,deleteTodo}