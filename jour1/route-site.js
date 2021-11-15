const { Router }= require("express");

const router = Router();

router.get("/home" , (req, rep) => {
    const welcome = {
        message : "bienvenu"
    }
    rep.render("home", welcome);
})

router.get("/add-user" , (req, rep) => {

    rep.render("add-user");
})

module.exports = router ;

