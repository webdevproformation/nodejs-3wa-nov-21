const request = require("supertest");
const server = require("../index");
const { Article } = require("../model-article");
const { Types } = require("mongoose")
const { User } = require("../model-user");
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

// TDD : Test Driven Developpement 
// décrite le besoin => sous forme de tests 
// ajouter le ou les fonctionnalités 

// ajouter une nouvelle fonctionnalité dans mon application 
// récupérer un article via son id 

// GET /:id  demande un article avec un id invalid   => serveur répond status 400 
// GET /:id  demande d'un article id valid ET il n'existe plus => serveur répond status 404 
// scénario où tout fonctionne  GET /:id   =>  { _id , titre , contenu } status 200

// le temps de créer les tests => reject 
// le temps de développer la fonctionnalité => reject

describe("GET /:id" , () => {

    beforeEach( () => {
        serveur = require("../index");
    })
    afterEach( async () => { 
        await Article.deleteMany({})
        serveur.close();
    })

    it("demande un article avec un id invalid" , async () => {
        const rep = await request(serveur).get(`/1`);
        expect(rep.status).toBe(400); // Bad Request 
    })
    it("demande d'un article avec id valid mais il n'existe plus => 404" , async () => {
        const id = Types.ObjectId(); 
        const rep = await request(serveur).get(`/${id}`);
        expect(rep.status).toBe(404);
        // SELECT * FROM table WHERE id = 9999999
        // ""
    })
    it("demande d'un article avec un id valid" , async () => {
        let nouvelArticle = new Article({ titre : "aaaaa" , contenu : "aaaaa" })
        nouvelArticle = await nouvelArticle.save();
        const rep = await request(serveur).get(`/${nouvelArticle._id}`);
        expect(rep.status).toBe(200);
        expect(rep.body).toHaveProperty("titre" , "aaaaa")
        expect(rep.body).toHaveProperty("contenu" , "aaaaa")
    })

})

describe("GET /titre/:titre" , () => {
    beforeEach( () => {
        serveur = require("../index");
    })
    afterEach( async () => {
        await Article.deleteMany({})
        serveur.close();
    })
    it("retourne le ou les articles status 200 si titre envoyé qui existe" , async () =>{
        let nouvelArticle = new Article({titre : "aaaaa" , contenu : "aaaaa"})
        nouvelArticle = await nouvelArticle.save()
        const rep = await request(serveur).get("/titre/aaaaa");
        expect(rep.status).toBe(200)
        expect(rep.body.length).toBe(1);
    })
    it("retourne tableau vide status 404 si titre envoyé qui n'existe pas" , async () => {
        const rep = await request(serveur).get("/titre/a");
        expect(rep.status).toBe(404)
        expect(rep.body.length).toBe(0);
    })
})

// route pour créer des articles => il faut au préalable avoir une autorisation pour pouvoir réaliser l'insertion

describe("POST /creer avec authentification" , () => {

    let token ; 
    let titre ;
    const exec = async () => {
        return await request(serveur).post( "/creer" )
                .set("x-auth" , token)
                .send({titre : titre , contenu : "aaaaa"});
    }

    beforeEach(() => {
        token = (new User()).generateJWT();
        titre = "aaaaa"
        serveur = require("../index");
    })
    afterEach( async () => {  
        serveur.close(); 
    })
    it("token non fourni , serveur répond erreur 401", async() => {
        token = "";
        const rep = await exec();
        expect(rep.status).toBe(401);
    })

    it("token fourni mais invalid , serveur répond erreur 400" , async () => {
        token = "a";
        const rep = await exec();
        expect(rep.status).toBe(400);
    })

    it("token fourni valid fournit un article invalid , serveur répond 400" , async () => {
        titre = "a"
        const rep = await exec();
        // erreur de Mongoose pas un retour 400 du serveur 
        expect(rep.status).toBe(400);
    })

    it("token fourni valid fournit un article invalid titre sup de 200 caractères , serveur répond 400" , async () => {
        titre = new Array(200+2).join("a")
        const rep = await exec();
        // erreur de Mongoose pas un retour 400 du serveur 
        expect(rep.status).toBe(400);
    })

    it("token fourni valid et un article valide , serveur répond 200" , async () => {
        const rep = await exec();
        expect(rep.status).toBe(200);
    })

})


describe("POST /creer-user avec authentification" , () => {

    beforeEach(() => {
        serveur = require("../index");
    })
    afterEach( async () => {  
        serveur.close(); 
    })
    it("pas de token => 401" , async () => {
        const rep = await request(serveur).post("/creer-user")
        expect(rep.status).toBe(401)
    })
    it("token invalid => 400" , async () => {
        const token = "a"
        const rep = await request(serveur).post("/creer-user")
                                          .set("x-auth", token );
        expect(rep.status).toBe(400)
    })
    it("token valid et que profil n'est pas conforme => 400" , async () => {
        const token = (new User).generateJWT()
        const profil = {email : "a" , password : "a"} ;
        const rep = await request(serveur).post("/creer-user")
                                          .set("x-auth", token )
                                          .send(profil);
        expect(rep.status).toBe(400)               
    })
    it("token valid et que le profil est conforme => 200" , async () => {
        const token = (new User).generateJWT()
        const profil = {email : "a@a.fr" , password : "aaaaa"} ;
        const rep = await request(serveur).post("/creer-user")
                                          .set("x-auth", token )
                                          .send(profil);
        expect(rep.status).toBe(200);          
    })
    
})