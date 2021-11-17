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