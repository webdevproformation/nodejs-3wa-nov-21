const { Schema, model } = require("mongoose")

const schemaArticle = new Schema({
    titre : { type : String , minlength : 5 , maxlength : 200 , required:true },
    contenu : { type : String , minlength : 5 , maxlength : 200 , required:true }
})

exports.Article = model("articles", schemaArticle);