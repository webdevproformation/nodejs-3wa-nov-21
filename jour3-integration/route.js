const { Router } = require("express");
const { Article } = require("./model-article");
const router = Router();

router.get("/" , async (req, rep) => {
  const articles = await Article.find();
  rep.json(articles);
})

router.post("/" , async (req, rep) => {
    const {titre , contenu} = req.body;
    let article = new Article( { titre , contenu});
    article = await article.save();
    rep.json(article);
})

module.exports = router ; 
