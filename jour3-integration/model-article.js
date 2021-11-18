const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schemaArticle = new Schema({
    titre : { type : String , minlength : 5 , maxlength : 200 , required:true },
    contenu : { type : String , minlength : 5 , maxlength : 200 , required:true }
})

exports.Article = model("articles", schemaArticle);

exports.schemaArticleJoi = Joi.object({
    titre : Joi.string().min(5).max(200).required(),
    contenu : Joi.string().min(5).max(200).required(),
});