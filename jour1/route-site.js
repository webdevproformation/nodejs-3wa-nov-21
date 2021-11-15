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
            status : "success"
        })
    }
    catch(ex){
        console.log(ex);
    }
})

router.get("/connexion" , async (req, rep) => {
    const www = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    rep.render("connexion" , { www } );
})

router.post("/connexion" , async (req, rep) => {
    try{
        const {email , password} = req.body ;

        const utilisateurRecherche = await UserModel.findOne({email : email})
        if(!utilisateurRecherche){
            return rep.status(404).json({
                status : "erreur",
                message : "aucun profil trouvé pour cet email"
            })
        }
        bcrypt.compare(password , utilisateurRecherche.password , (err , result) => {
            if(err) return rep.status(400).json({
                status : "erreur",
                message : "aucun profil trouvé pour ce passord"
            });

            // ajouter à la session une nouvelle valeur pour l'utilisateur 
            req.session.user = {
                email : utilisateurRecherche.email,
                role : utilisateurRecherche.role,
                _id : utilisateurRecherche._id
            }

             rep.redirect("/admin");
            //document.location.href = "/admin"
        })

    }
    catch(ex){
        console.log(ex)
    }
})

router.get("/admin" , ( req, rep ) => {
    const user = req.session.user;
    rep.render("admin" , { user });
})

module.exports = router ;

