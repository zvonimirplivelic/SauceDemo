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

    // NEED TO FIND OUT HOW TO NAVIGATE TO ANOTHER PAGE WITHIN A TEST
    // it.only('should open about page', () => {

    //     // Open the hamburger menu
    //     cy.get('.bm-burger-button > button').click()
    //     cy.get('nav.bm-item-list').should((em) => {
    //         expect(em).to.be.visible
    //         expect(em.children()).to.not.be.undefined
    //         expect(em.children()).to.have.length(4)
    //     })
        
    //     cy.visit('https://saucelabs.com/')

    // })


    it.only('should reset application state', () => {
        // Add mutliple items to the Cart
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').should('have.text', 1)
        cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
        cy.get('.fa-layers-counter').should('have.text', 2)
        cy.get(':nth-child(5) > .pricebar > .btn_primary').click()
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
        cy.get('.bm-cross-button > button').click()
        cy.get('.fa-layers-counter').should('not.exist')

        // Additionally the states on item buttons dont change. It stays at REMOVE

    })
})