const { Router }= require("express");

const router = Router();

router.get("/home" , (req, rep) => {
    const welcome = {
        message : "bienvenu"
    }
    rep.render("home", welcome);
})

module.exports = router ;

