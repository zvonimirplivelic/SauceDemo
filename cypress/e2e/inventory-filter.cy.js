/// <reference types="cypress" />

describe('inventory filter feature', () => {
    beforeEach(() => {
      cy.visit('/index.html')
      cy.loginAsStandardUser()
    })

    it('should filter data from A to Z', () => {

        var sortedItems = [
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Onesie",
            "Test.allTheThings() T-Shirt (Red)"
        ]
        cy.get('.product_sort_container').select('Name (A to Z)').invoke('val').should('eq', 'az')
        cy.get('.inventory_item').each((item, index) => {
            cy.wrap(item).should('contain.text', sortedItems[index])
        })
    })

    it('should filter data from Z to A', () => {
        
        var sortedItems = [
            "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Onesie",
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Bike Light",
            "Sauce Labs Backpack"
        ]

        cy.get('.product_sort_container').select('Name (Z to A)').invoke('val').should('eq', 'za')

        cy.get('.inventory_item').each((item, index) => {
            cy.wrap(item).should('contain.text', sortedItems[index])
        })
    })

    it('should filter data by price (low to high)', () => {

        var sortedItems = [
            "Sauce Labs Onesie",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt",
            "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Backpack",
            "Sauce Labs Fleece Jacket"
        ]
        cy.get('.product_sort_container').select('Price (low to high)').invoke('val').should('eq', 'lohi')

        cy.get('.inventory_item').each((item, index) => {
            cy.wrap(item).should('contain.text', sortedItems[index])
        })
    })

    it('should filter data by price (high to low)', () => {

        var sortedItems = [
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Backpack",
            "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Bike Light",
            "Sauce Labs Onesie"
        ]
        cy.get('.product_sort_container').select('Price (high to low)').invoke('val').should('eq', 'hilo')
        
        cy.get('.inventory_item').each((item, index) => {
            cy.wrap(item).should('contain.text', sortedItems[index])
        })
    })
})  