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

describe("salutation" , () => {
    test("input fr retourne <p>Bonjour</p>" , () => {
        const resultat = lib.salutation("fr")
        expect(resultat).toMatch(/^<p>Bonjour<\/p>$/);
        expect(resultat).toBe("<p>Bonjour</p>");
        expect(resultat).toContain("<p>Bonjour</p>");
    })
    it("return <p>Hello</p> si input en" , () => {
        const resultat = lib.salutation("en");
        expect(resultat).toBe("<p>Hello</p>");
    })
    it("return langue inconnue si no input" , () => {
        const resultat = lib.salutation();
        expect(resultat).toBe("langue inconnue");
    })
})

describe("saison" , () => {
    // la fonction doit retourner 4 valeurs 
    test("retourner 4 valeurs" , ()=> {
        const resultat = lib.saison()
        expect(resultat.length).toBe(4);
    })
    // tester que certaines valeurs sont bien présentes dans le tableau
    test("doit contenir printemps et automne" , () => {
        const resultat = lib.saison()
        expect(resultat).toContain("printemps")
        expect(resultat).toContain("automne")
        expect(resultat[0]).toContain("printemps")
        expect(resultat[2]).toContain("automne")
    })

    it("doit contenir printemps et automne version 2" , () => {
        // version qui va vous éviter d'avoir à écrire plusieurs assertions avec des toContain()
        const resultat = lib.saison()
        expect(resultat).toEqual(expect.arrayContaining(["printemps" , "automne"]))
    })
})


describe("fizzBuzz" , () => {
    it("retourne FizzBuzz si nombre multiple de 5 et 3" , () => {
        for(let i = 15 ; i < 1000 ; i+= 15){
            const resultat = lib.fizzBuzz(i)
            expect(resultat).toEqual("FizzBuzz")
        }
    })
    it("retourne Fizz si nombre multiple de 3" , () => {
        for(let i = 3 ; i < 1000 ; i+= 3){
            if(i % 5 != 0){
                const resultat = lib.fizzBuzz(i)
                expect(resultat).toEqual("Fizz")
            }
        }
    })
    it("retourne Buzz si nombre multiple de 5" , () => {
        for(let i = 5 ; i < 1000 ; i+= 5){
            if(i % 3 != 0){
                const resultat = lib.fizzBuzz(i)
                expect(resultat).toEqual("Buzz")
            }
        }
    })
    it("retourne nombre si nombre n'est pas multiple de 3 ou 5" , () => {
        for(let i = 1 ; i < 1000 ; i++){
            if(i % 3 != 0 && i % 5 != 0){
                const resultat = lib.fizzBuzz(i)
                expect(resultat).toEqual(i)
            }
        }
    })
})

