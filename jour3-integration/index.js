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

app.listen(PORT , console.log(`express sur port ${PORT}`));

// export NODE_ENV=production && nodemon index.js
// postman => via cet outil vous venez de réaliser un test manuel de votre API 
// test integration manuellement code + dépendance à la base de données 