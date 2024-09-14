// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsStandardUser', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()

    cy.checkInventoryPage()
})

Cypress.Commands.add('checkInventoryPage', () => {
    cy.location('pathname').should('match', /v1\/inventory.html/);

    cy.get('.peek').should('exist') 
    cy.get('.product_label').should('have.text', 'Products')
    cy.get('.inventory_item').should('have.length', 6)
})

Cypress.Commands.add('goToCheckoutForm', () => {
    cy.loginAsStandardUser()

    cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
    cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
    cy.get(':nth-child(6) > .pricebar > .btn_primary').click()

    cy.get('#shopping_cart_container').click()

    cy.get('.btn_action').should('contain', "CHECKOUT").click()

    cy.get('.subheader').should('have.text', 'Checkout: Your Information')
    cy.location('pathname').should('match', /v1\/checkout-step-one.html/)

})