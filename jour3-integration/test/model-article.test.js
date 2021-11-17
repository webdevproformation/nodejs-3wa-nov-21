const request = require("supertest");
const server = require("../index");
let serveur ; 

describe("POST " , () => {
    beforeEach(() => { // permet d'effectuer une traitement AVANT chaque test
        serveur = require("../index"); // démarrer le serveur
    })
    afterEach( () => { // permet d'effectuer une traitement APRES chaque test
        serveur.close(); // stopper le serveur 
    })
    it("va ajouter un nouvel article dans la base de données " , async () => {
       const rep = await request(server).post("/").send({titre : "Article1" , contenu : "lorem ipsum" })
        // console.log(rep); 
    })
    it("va ajouter un nouvel article dans la base de données " , async () => {
        const rep = await request(server).post("/").send({titre : "Article2" , contenu : "lorem ipsum" })
         // console.log(rep); 
    })
}) 