const request = require("supertest");
const server = require("../index");
const { Article } = require("../model-article")
let serveur ; 

describe("POST " , () => {
    beforeEach(() => { // permet d'effectuer une traitement AVANT chaque test
        serveur = require("../index"); // démarrer le serveur
    })
    afterEach( async () => { // permet d'effectuer une traitement APRES chaque test
        await Article.deleteMany({}) // permet d'effectuer des tests => GET 
        serveur.close(); // stopper le serveur 
    })
    it("va ajouter un nouvel article dans la base de données " , async () => {
       const rep = await request(server).post("/").send({titre : "Article1" , contenu : "lorem ipsum" })
       expect(rep.body).toHaveProperty("_id");
       expect(rep.body).toHaveProperty("__v");
       expect(rep.body).toMatchObject({titre : "Article1"})
       expect(rep.body).toMatchObject({contenu : "lorem ipsum"})
    })
}) 

describe("GET " , () => {
    let ids = [];
    let nouveauxArticle = []
    beforeEach(() => {
        serveur = require("../index");
        nouveauxArticle = [
            { titre : "aaaaa" , contenu : "aaaaa" },
            { titre : "bbbbb" , contenu : "bbbbb" }
        ]
    })
    afterEach( async () => { 
        const titres = nouveauxArticle.map( item => { return item.titre})
        await Article.deleteMany({"titre": { $in : titres  }})  
        serveur.close(); 
    })
    it("récupérer des articles de la base de données", async () => {
        // ajouter de articles valides via la model mongoose Article
        await Article.insertMany(nouveauxArticle)// .lastid()
        // requête avec supertest 
        const rep = await request(server).get("/")
        // get() post() put() delete()

        //ids = rep.body.map( item => { return item._id})
        // console.log(ids);
        // rep de supertest => vérifier avec des assertions 
        expect(rep.status).toBe(200);

        // vérifier combien d'enregistrement je vais récupérer de la base 
        expect(rep.body.length).toBe(2);
        expect(rep.body.some(a => a.titre === "aaaaa")).toBeTruthy();
        expect(rep.body.some(a => a.contenu === "bbbbb")).toBeTruthy();

    })
})