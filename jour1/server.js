const express = require("express");
const PORT = process.env.PORT || 3444 ; // hébergement heroku
const session = require("express-session"); 
const MongoStore = require("connect-mongo");
require("dotenv").config();
/* const pug = require("pug") */

require("./start-mongo")(); // start la balise de donnée MongDB Atlas

const app = express(); 
// middleware
app.use(express.json());
app.use(
    session({
        secret : process.env.COOKIE, 
        resave : false ,
        saveUninitialized : true ,
        store : MongoStore.create({
            mongoUrl : process.env.BD, 
            collection : "sessions"
        }),
        cookie : {
            maxAge: 1000 * 60 * 10, // cookie a une durée de vie 3 minutes
            sameSite : true
        }
    })
);

app.set("views" , "public"); // le dossier qui contient les fichier.pug
app.set("view engine" , "pug") // express => rep.render("fichier")
app.use(express.static("public"))

app.use("/" , require("./routes"));
app.use("/" , require("./routes-cookie"));
app.use("/" , require("./route-site")); 

app.listen(PORT , () => console.log(`bienvenu sur le serveur express ${PORT}`));
// postman => http://localhost:3444
