const request = require("supertest")
const server = require("../index");

describe("POST " , () => {
    it("va ajouter un nouvel article dans la base de données " , async () => {
        const rep = await request(server).post("/").send({titre : "Article1" , contenu : "lorem ipsum" })
        console.log(rep);
    })
})