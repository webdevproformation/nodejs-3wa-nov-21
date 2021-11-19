const express = require("express")
const PORT = process.env.PORT || 3333 ; 
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression")

const app = express();

// middleware AVANT les routes 
app.use(cors())
app.use(helmet())
app.use(compression())

// à écrire AVANT la route créé
app.get("/" , (req, rep) => {
    rep.send("j'ai réussi à mettre en ligne un projet nodejs")
})
app.get("/nous-contacter" , (req, rep) => {
    rep.send("veuillez utiliser le formulaire ci dessous svp")
})

app.listen(PORT , () => console.log(`serveur express démarré sur ${PORT}`))
