const { Schema , model } = require("mongoose");

const userSchema = new Schema({
    email : { type : String , required: true},
    password :{ type : String , required: true},
    role : { type : String , enum : ["admin", "redacteur"] , default : "admin"}
});

exports.UserModel = model("users", userSchema)