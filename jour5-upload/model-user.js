const {Schema, model} = require("mongoose");


const ficheSchema = new Schema({
    nom : {type: String , required : true},
    dt_creation : {type: Date , default : Date.now()},
    fichier_pdf : {type: String , required : true}
})

exports.Fiche = model("fiches", ficheSchema);

// nom 
// dt_creation par défaut maintenant 
// fichier_pdf string "images/1637329610932-pdf.pdf"