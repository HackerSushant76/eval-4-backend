const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    IP_address : {type: String, required: true}
})
const User = mongoose.model("todoUser" , userSchema)

module.exports = {User}