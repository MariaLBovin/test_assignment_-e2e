
beforeEach(() => {
  cy.visit('/')
});

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
});

describe('should find all existing parts', () =>{

  it('should find input', () =>{
    cy.get("input").should("exist")
  })
  it('should find empty input', () => {
    cy.get('input').should('contain','')
  })
  it('should find search-button', () => {
    cy.get('button').should('contain', 'Sök')
  })
})

describe('should test if HTML is fetched', () => {

  it('should find movies', () => {
    cy.get('input').type('Sex and the City').should('have.value', 'Sex and the City')

    cy.get('button').click()

    cy.get('h3').contains('Sex and the City').should('exist')
  })
   it('should not find movies but a p-tag', () => {
    cy.get('input').type('filmtitel').should('have.value', 'filmtitel')

    cy.get('button').click()

    cy.get('#movie-container').should('not.have.attr', 'h3')
    })
})

describe('should test with mock-data', () => {

  it('should find mockdata', () => {
    cy.intercept('get', "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"moviedata"}).as('moviedata');

    cy.get('input').type('Sex and the City').should('have.value', 'Sex and the City')

    cy.get('button').click()

    cy.get('h3').contains('Sex and the City').should('exist')
    cy.get('h3').contains('Fake').should('exist')
  })

 it('should find correct url', () => {
    cy.intercept('get', "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"moviedata"}).as('moviedata')

    cy.get('input').type('Sex and the City').should('have.value', 'Sex and the City')

    cy.get('form').submit()

    cy.wait("@moviedata").its('request.url').should('contain', 'City')

  })
})
describe('should test for errors', () => {

  it('should display error message', () => {
    cy.intercept('get', "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"nomovies"}).as('Nomoviedata')

    cy.get('input').type('Sex and the City').should('have.value', 'Sex and the City')

    cy.get('form').submit()

    cy.get('p').contains('Inga sökresultat att visa')

  })

}) 