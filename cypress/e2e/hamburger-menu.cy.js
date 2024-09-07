/// <reference types="cypress" />

describe('hamburger menu tests', () => {
    beforeEach(() => {
        cy.visit('/index.html')
        cy.loginAsStandardUser()
    })
    it('should open and close the hamburger menu', () => {

        cy.get('nav.bm-item-list').should('not.be.visible')

        cy.get('.bm-burger-button > button').click()

        cy.get('nav.bm-item-list').should((em) => {
            expect(em).to.be.visible
            expect(em.children()).to.not.be.undefined
            expect(em.children()).to.have.length(4)
        })
        
        cy.get('.bm-cross-button > button').click()

        cy.get('nav.bm-item-list').should('not.be.visible')
        cy.checkInventoryPage()
    })

    it('should open all items list', () => {
        // Open backpack list item
        cy.get('#item_4_title_link > .inventory_item_name').should('have.text', 'Sauce Labs Backpack').click()

        cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Backpack')
        cy.get('nav.bm-item-list').should('not.be.visible')

        // Open the hamburger menu
        cy.get('.bm-burger-button > button').click()
        cy.get('nav.bm-item-list').should((em) => {
            expect(em).to.be.visible
            expect(em.children()).to.not.be.undefined
            expect(em.children()).to.have.length(4)
        })
        // Navigate to All Items
        cy.get('#inventory_sidebar_link').click()
        cy.checkInventoryPage()
    })

    it('should open about page', () => {

        // Open the hamburger menu
        cy.get('.bm-burger-button > button').click()
        cy.get('nav.bm-item-list').should((em) => {
            expect(em).to.be.visible
            expect(em.children()).to.not.be.undefined
            expect(em.children()).to.have.length(4)
        })
        
        // Check if sidebar link returns code 200
        cy.get('#about_sidebar_link').then((link) => {
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
        })

        // Can't get a propper test. This part of code simulates visiting another page after .visit() is performed
        cy.get('#about_sidebar_link').click()
        cy.origin('https://saucelabs.com/', () => {
            cy.url().should('eq', 'https://saucelabs.com/')
            cy.get('img').should('have.attr', 'alt', 'Saucelabs')
        })

    })


    it('should reset application state', () => {
        // Add mutliple items to the Cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART').click()
        cy.get('.btn_secondary').should('have.class', 'btn_secondary')
        cy.get('.fa-layers-counter').should('have.text', 1)

        cy.get(':nth-child(3) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART').click()
        cy.get('.btn_secondary').should('contain', 'REMOVE')
        cy.get('.fa-layers-counter').should('have.text', 2)

        cy.get(':nth-child(5) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART').click()
        cy.get('.btn_secondary').should('have.class', 'btn_secondary')
        cy.get('.fa-layers-counter').should('have.text', 3)

     
        cy.get('nav.bm-item-list').should('not.be.visible')

        // Open the hamburger menu
        cy.get('.bm-burger-button > button').click()
        cy.get('nav.bm-item-list').should((em) => {
            expect(em).to.be.visible
            expect(em.children()).to.not.be.undefined
            expect(em.children()).to.have.length(4)
        })
        // Reset application state
        cy.get('#reset_sidebar_link').click()
        // These tests do not pass
        cy.get(':nth-child(1) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART')
        cy.get(':nth-child(3) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART')
        cy.get(':nth-child(5) > .pricebar > .btn_primary').should('have.text', 'ADD TO CART')
        cy.get('.bm-cross-button > button').click()
        cy.get('.fa-layers-counter').should('not.exist')

        // Additionally the states on item buttons dont change. It stays at REMOVE

    })
})