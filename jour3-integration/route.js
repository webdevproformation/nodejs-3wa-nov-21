const { Router } = require("express");
const { Article , schemaArticleJoi } = require("./model-article");
const router = Router();
const { Types } = require("mongoose")
const { authentification } = require("./authentification");
const { schemaUserJoi , User } = require("./model-user");

router.get("/" , async (req, rep) => {
  const articles = await Article.find();
  rep.json(articles);
})

router.get("/titre/:titre" , async(req, rep) => {
  const titre = req.params.titre
  const articleRecherche = await Article.find({titre : titre});
  if(articleRecherche.length === 0){
    return rep.status(404).json(articleRecherche);
  }
  rep.json(articleRecherche);
})

router.get("/:id" , async(req, rep) => {
   const id = req.params.id ;
   if(!Types.ObjectId.isValid(id)){
    return rep.status(400).send("id non valid");
   }
   let articleRecherche = await Article.findById(id);
   if(!articleRecherche){
    return rep.status(404).send("article non trouvé pour l'id demandé")
   }
   rep.json(articleRecherche);
})

router.post("/creer" , authentification  ,  async (req, rep) => {
  const {titre , contenu} = req.body;
  const { value , error } = schemaArticleJoi.validate({titre , contenu})
  if(error){
    return rep.status(400).send("article non conforme ")
  }
  let article = new Article( { titre , contenu });
  article = await article.save();
  rep.json(article);
})

router.post("/" , async (req, rep) => {
    const {titre , contenu} = req.body;
    let article = new Article( { titre , contenu});
    article = await article.save();
    rep.json(article);
})

router.post("/creer-user" , authentification  , async( req, rep) => {
  const { email , password } = req.body;
  const { value , error } = schemaUserJoi.validate({ email , password });
  if(error){
    return rep.status(400).send("profil invalid");
  }
  let nouvelUser = new User({ email , password })
  nouvelUser = await nouvelUser.save();
  rep.json(nouvelUser); 
})

router.get("/route-factice" , (req, rep) => {
  rep.send("factice");
})

module.exports = router ; 
