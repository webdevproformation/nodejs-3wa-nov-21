const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    nom : {type : String , required : true},
    message : {type : String , required : true},
})

module.exports = model("tchats", messageSchema);