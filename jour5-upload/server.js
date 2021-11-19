// npm init --yes 
// npm i express multer 

const express = require("express");
const multer = require("multer");

const PORT = process.env.PORT || 3210
const app = express()
// middleware 

const strategie = multer.diskStorage({
    destination : (req, file , cb) => {
        cb( null , `${__dirname}/images/` ) // chemin absolu dans le dossier en cours 
    },
    filename : (req, file , cb) => {
        cb(null , `${Date.now()}-${file.originalname}` );
    }
})

const filter = (req, file , cb) => {
    cb(null , true); // tous les fichiers sont acceptés en upload
    // cb(null , false); // tous les fichiers ne sont acceptés en upload
}

const upload = multer({
        storage : strategie ,
        limits : { fileSize : 1024 * 1024 * 6 }, // maximum peuvent avoir un point de 6 Mo
        fileFilter : filter
    }) 
app.use("/" , express.static("public"))

app.post("/" , upload.single("pdf") , (req, rep) => { 
    // dans notre requête POST il y aura un champ image => fichier image 
    // on peut envoyer 1 seule image 
    // démarrer le serveur 
    // lancer postman 
    rep.json({
        file : req.file, // ajoute une nouvelle propriété à req => file 
        body : req.body  // pour les champs de type textuel 
    })
})

app.listen(PORT , () => {console.log("express start sur port " + PORT) }) 