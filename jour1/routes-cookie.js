// requête à un serveur depuis un client 
// firefox / Postman
// procole HTTP stateless 
// il n'y a pas de persistance d'information entre chaque requête 

// GET http://localhost:3444
// POST http://localhost:3444

// il est possible de mettre en place une persistance d'information entre le client
// et le serveur via 

// serveur => session => répondre json + cookie 
// client => stocké cookie 

// dès que le client Firefox / Chrome reçoit un cookie d'un serveur 
// automatiquement cookie (contenu) renvoyé automatiquement vers le server 

// client va stocker le cookie pendant une durée limité 
// le cookie a une durée de vie limitée dans le temps 

// voir le cookie dans le client 

// dans un navigateur web 
// http://localhost:3444 > inspecteur > reseau 

// actuellement réponse du serveur pas de setCookie
// créer directement depuis console : 
/**
// simule comme si le serveur a envoyé un cookie au client 
const maintenant = new Date()
maintenant.setTime(maintenant.getTime() + 60000) // maintenant + 60 secondes
document.cookie = "personnalise=toto; expires=" + maintenant.toUTCString() + ";"
npm i express-session
 */

// créer une session qui va permettre de créer un cookie 

const { Router } = require("express");

const router = Router();

router.get("/cookie", (req, rep) => {
    req.session.info = {
        langue : "fr",
        nom : "Alain"
    }

    rep.send("ajouter une information à la session");
})

router.get("/reponse", (req, rep) => {
    rep.send("bonjour" + req.session.info.nom );
})

router.get("/exo" , (req, rep) => {
    if(!req.session.compteur){
        req.session.compteur = 1;
    } else {
        req.session.compteur++ ;
    }
    rep.send(`combien de fois j'ai actualisé cette page ?? : ${req.session.compteur}`)
})

module.exports = router ;

// créer une nouvelle route get /exo
// ajouter à la session une nouvelle valeur compteur 
// dès que l'on appele l'adresse http://localhost:3444/exo 
// augmenter de + 1 le compteur 
// afficher la valeur du compteur dans la page 

// pug => moteur de template générer des page html authentification 
// en plus la session => autorisation 
// rdv 14h00 bon appétit !!! 

// pug 
// npm i pug
