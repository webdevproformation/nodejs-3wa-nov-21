const { Router }= require("express");

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

router.post("/add-user" , (req, rep) => {
    const { email, password } = req.body;

    rep.json( { 
        status : "success" ,
        profil : {email, password}
    })
})

module.exports = router ;

