const { Schema, model } = require("mongoose");

const produitSchema = new Schema({
    nom : String ,
    prix : Number ,
    dt_creation : { type : Date , default : Date.now() }
})

exports.ProduitModel = model("produits", produitSchema);

