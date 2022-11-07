const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    taskname : {type: String , required : true},
    status : {type: Boolean, required : true},
    tag : {type: String , required : true}
})
const Todo = mongoose.model("todos", todoSchema)

module.exports = {Todo}