const lib = require("../lib")

test( "ttc si input 1 alors output 1.2" , () => {

    // traitements 
    const variable = lib.ttc(1);

    // assertion : affirmer que valeur === 10 
    expect( variable ).toBe( 1.2 );
    // https://jestjs.io/
    // https://jestjs.io/docs/using-matchers
} )

test("ttc si input 0 alors output 0" , () => {
    const variable = lib.ttc(0);
    expect( variable ).toBe( 0 );
    expect( variable ).toEqual( 0 );
})

// test la fonction genererBtn
// permet de regrouper les tester qui portent sur la même fonctionnalité
describe("genererBtn" , () => {
    it("contient id si param id est string", ()=>{
        const resultat = lib.genererBtn("a" , "b")
        // expect(resultat).toBe('<button id="b">a</button>')
        expect(resultat).toMatch(/button id/)
    } )
    it("contient class si param id n'est pas défini", ()=>{
        const resultat = lib.genererBtn( "a" )
        expect(resultat).toMatch(/button class/)
    } )
})