// npm init --yes 
// npm i express multer 

const express = require("express");
const multer = require("multer");
const { Fiche } = require("./model-user");

const { connect } = require("mongoose");
require("dotenv").config();

connect( process.env.DB , {useNewUrlParser : true})
        .then(() => console.log("connexion db réussie"))
        .catch(ex => console.log(new Error(ex)))

const PORT = process.env.PORT || 3210
const app = express()
// middleware 
//déclare que le contenu du dossier images qui est appelé /images est public


const strategie = multer.diskStorage({
    destination : (req, file , cb) => {
        cb( null , `${__dirname}/images/` ) // chemin absolu dans le dossier en cours 
    },
    filename : (req, file , cb) => {
        const finalName = `${Date.now()}-${file.originalname}`;
        req.finalName = finalName ;
        cb(null , finalName );
    }
})

const filter = (req, file , cb) => {
    if(file.mimetype == "application/pdf"){
        cb(null , true); // tous les fichiers sont acceptés en upload
    }else {
        cb(null , false); // tous les fichiers ne sont acceptés en upload
    }
}

const upload = multer({
        storage : strategie ,
        limits : { fileSize : 1024 * 1024 * 6 }, // maximum peuvent avoir un point de 6 Mo
        fileFilter : filter
    })
app.use("/" , express.static("public"))

app.post("/" , upload.single("pdf") , async (req, rep) => { 
    // dans notre requête POST il y aura un champ image => fichier image 
    // on peut envoyer 1 seule image 
    // démarrer le serveur 
    // lancer postman 
    let fiche = {
        nom : req.body.nom,
        fichier_pdf : `images/${req.finalName}`
    }
    fiche = new Fiche(fiche)
    fiche =  await fiche.save()
    rep.json(fiche)
})
app.use("/images", express.static("images"))

app.get("*" , (req, rep) => {
    rep.redirect("/")
})

app.listen(PORT , () => {console.log("express start sur port " + PORT) })

// cas pratique => créer un fichier de model 
// fiche 
// enregistrer dans un table fiches 
// schema 
// nom 
// dt_creation par défaut maintenant 
// fichier_pdf string "images/1637329610932-pdf.pdf"

// créer une nouvelle fiche qui contient 
// nom mis 
// upload/dt-nom_fichier => dans la base de données 

// npm i mongoose dotenv
// rdv 15h52 bon café !! 