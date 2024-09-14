/// <reference types="cypress" />

describe('checkout form', () => {
  
    beforeEach(() => {
        cy.visit('/index.html')
        cy.goToCheckoutForm()
    })

    
    it('should proceed to Checkout: Overview page', () => {

        cy.get('[data-test="firstName"]').type('TestFname')
        cy.get('[data-test="lastName"]').type('TestLname')
        cy.get('[data-test="postalCode"]').type('872633')

        cy.get('.btn_primary').should((button) => {
            expect(button).to.have.class('btn_primary')
            expect(button).to.have.value('CONTINUE')
        }).click()

        cy.get('.subheader').should('have.text', 'Checkout: Overview')
        cy.get('.fa-layers-counter').should('have.text', 3)
        cy.get('.cart_item').should('have.length', 3)
    })

    it('should not be able to proceed with empty First Name', () => {

        cy.get('[data-test="error"]').should('not.exist')

        cy.get('[data-test="lastName"]').type('TestLname')
        cy.get('[data-test="postalCode"]').type('872633')

        cy.get('.btn_primary').should((button) => {
            expect(button).to.have.class('btn_primary')
            expect(button).to.have.value('CONTINUE')
        }).click()

        cy.get('[data-test="error"]').should((errorMessage) => {
            expect(errorMessage).to.be.visible
            expect(errorMessage).to.have.text('Error: First Name is required')
        })
        cy.get('.error-button').click()

        cy.get('[data-test="error"]').should('not.exist')

    })

    it('should not be able to proceed with empty Last Name', () => {

        cy.get('[data-test="error"]').should('not.exist')

        cy.get('[data-test="firstName"]').type('TestFname')
        cy.get('[data-test="postalCode"]').type('872633')

        cy.get('.btn_primary').should((button) => {
            expect(button).to.have.class('btn_primary')
            expect(button).to.have.value('CONTINUE')
        }).click()

        cy.get('[data-test="error"]').should((errorMessage) => {
            expect(errorMessage).to.be.visible
            expect(errorMessage).to.have.text('Error: Last Name is required')
        })
        cy.get('.error-button').click()
        
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('should not be able to proceed with empty Postal Code', () => {

        cy.get('[data-test="error"]').should('not.exist')

        cy.get('[data-test="firstName"]').type('TestFname')
        cy.get('[data-test="lastName"]').type('TestLname')

        cy.get('.btn_primary').should((button) => {
            expect(button).to.have.class('btn_primary')
            expect(button).to.have.value('CONTINUE')
        }).click()

        cy.get('[data-test="error"]').should((errorMessage) => {
            expect(errorMessage).to.be.visible
            expect(errorMessage).to.have.text('Error: Postal Code is required')
        })
        cy.get('.error-button').click()
        
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('should accept only integer input as Postal Code', () => {

        cy.get('[data-test="error"]').should('not.exist')

        cy.get('[data-test="firstName"]').type('TestFname')
        cy.get('[data-test="lastName"]').type('TestLname')
        cy.get('[data-test="postalCode"]').type('TestPC').then((postalCodeInput) => {
            expect(postalCodeInput).to.have.attr('type', 'number')
        })


        cy.get('.btn_primary').should((button) => {
            expect(button).to.have.class('btn_primary')
            expect(button).to.have.value('CONTINUE')
        }).click()

        cy.get('[data-test="error"]').should((errorMessage) => {
            expect(errorMessage).to.be.visible
            expect(errorMessage).to.have.text('Error: Postal Code is required')
        })
        cy.get('.error-button').click()
        
        cy.get('[data-test="error"]').should('not.exist')
    })

    it('should return to cart when pressing cancel', () => {

        cy.get('.cart_cancel_link').click()
        cy.get('.subheader').should('have.text', 'Your Cart')
        cy.get('.fa-layers-counter').should('have.text', 3)
        cy.get('.cart_item').should('have.length', 3)
    })
})