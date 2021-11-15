const  { Router } = require("express"); 
const router = Router();
const { ProduitModel } = require("./model-produit");

router.get("/" , async (req, rep) => {
    try{
        let nouveauProduit = new ProduitModel({ nom : "produit1" , prix : 20 });
        nouveauProduit = await nouveauProduit.save()
        rep.send(nouveauProduit);
    }
    catch(ex){
        console.log(ex)
    }
})
router.post("/" ,  async (req, rep) => {
    try{
        const { nom , prix } = req.body;
        let nouveauProduit = new ProduitModel({ nom  , prix  })
        nouveauProduit = await nouveauProduit.save()
        rep.send(nouveauProduit);
    }
    catch(ex){
        console.log(ex)
    }
})
module.exports = router ;