// npm init --yes 
// npm i express multer 

const express = require("express");
const multer = require("multer");

const PORT = process.env.PORT || 3210
const app = express()
// middleware 
const upload = multer({dest : "images/"}) // chemin relatif dans le dossier en cours 

app.use("/" , express.static("public"))

app.post("/" , upload.single("pdf") , (req, rep) => { 
    // dans notre requête POST il y aura un champ image => fichier image 
    // on peut envoyer 1 seule image 
    // démarrer le serveur 
    // lancer postman 
    rep.json("hello")
})

app.listen(PORT , () => {console.log("express start sur port " + PORT) }) 