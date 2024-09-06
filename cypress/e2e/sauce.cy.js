/// <reference types="cypress" />

describe('successful purchase', () => {
  
    beforeEach(() => {
        cy.visit('/index.html')
    })
    
    it('should complete a purchase', () => {
      cy.loginAsStandardUser()

      // Add three items to the cart
      cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
      cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
      cy.get(':nth-child(6) > .pricebar > .btn_primary').click()

      // Click the cart to proceed
      cy.get('#shopping_cart_container').click()

      // Click the checkout button
      cy.get('.btn_action').should('contain', "CHECKOUT").click()

      // Fill the checkouf form
      cy.get('[data-test="firstName"]').type('TestFname')
      cy.get('[data-test="lastName"]').type('TestLname')
      cy.get('[data-test="postalCode"]').type('872633')

      // Click Continue button
      cy.get('.btn_primary').should('contain', "CONTINUE").click()


      // Click the Finish button
      cy.get('.btn_action').should('contain', "FINISH").click()

      cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER')
    })
  })