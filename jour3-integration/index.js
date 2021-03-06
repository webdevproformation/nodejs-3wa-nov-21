const express = require("express");
const { connect } = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 4444 ;

const url = process.env.NODE_ENV === "production" ? process.env.BDD : process.env.BDD_DEV

connect(url , {useNewUrlParser : true} )
    .then(( ) => console.log("connexion bdd " + url))
    .catch(ex => console.log(new Error(ex)))

const app = express();
app.use(express.json());
app.use("/" , require("./route"));

const server = app.listen(PORT , console.log(`express sur port ${PORT}`));

module.exports = server ; 
// export NODE_ENV=production && nodemon index.js
// postman => via cet outil vous venez de réaliser un test manuel de votre API 
// test integration manuellement code + dépendance à la base de données 

// npm i supertest -D 
// livrairie qui permet de réaliser l'ensemble des actions que l'on fait avec postman via du code =>réaliser des requête http exactement comme postman 