const { Schema , model } = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

const userSchema = new Schema({
    email : { type : String , minlength : 5 , required:true},
    password : { type : String , minlength : 5 , required:true}
});

// générer un jwt depuis l'id d'un compte user 
userSchema.methods.generateJWT = function(){
    const payload = {
        _id : this._id
    }
    const token = jwt.sign(payload , process.env.SECRET_JWT);
    return token ; 
}

exports.User = model("users", userSchema)

exports.schemaUserJoi = Joi.object({
    email : Joi.string().email({tlds:{allow: true}}).min(5).required() ,
    password : Joi.string().min(5).required() ,
})