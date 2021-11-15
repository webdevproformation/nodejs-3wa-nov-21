const { Router }= require("express");
const { UserModel } = require("./model-user");
const bcrypt = require("bcrypt");
const router = Router();

router.get("/home" , (req, rep) => {
    const welcome = {
        message : "bienvenu"
    }
    rep.render("home", welcome);
})

router.get("/add-user" , (req, rep) => {
    const www = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    //            http          ://   localhost:3444/   add-user
    rep.render("add-user" , { www });
})

router.post("/add-user" , async (req, rep) => {
    try{
        const { email, password } = req.body;

        // vérifier si l'email n'est pas déjà présent dans la base ?? 

        const utilisateurRecherche = await UserModel.find({email : email})
        // console.log(utilisateurRecherche);
        if(utilisateurRecherche.length > 0){
            return rep.status(400).json({
                status : "erreur",
                message : "l'email existe déjà dans la base de données"
            })
        }
        // hashage du mot de pass
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password , salt)

        let newUser = new UserModel({ email , password : passwordHashed })
        newUser = await newUser.save()

        rep.json( { 
            status : "success" ,
            profil : newUser
        })
    }
    catch(ex){
        console.log(ex);
    }
})

module.exports = router ;

