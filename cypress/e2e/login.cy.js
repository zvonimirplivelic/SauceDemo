/// <reference types="cypress" />

describe('login feature', () => {
  beforeEach(() => {
    cy.visit('/index.html')
})
  it('should not be able to log in with empty credentials', () => {

    cy.get('[data-test="error"]').should('not.exist')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Username is required')
    })
    cy.get('.error-button').should('exist')
  })

  it('should close the error message after unsuccessful login with empty credentials', () => {

    cy.get('[data-test="error"]').should('not.exist')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Username is required')
    })
    
    cy.get('.error-button').should('exist').click()

    cy.get('[data-test="error"]').should('not.exist')
  })

  it('should not be able to login with empty username field', () => {

    cy.get('[data-test="error"]').should('not.exist')
    cy.get('[data-test="password"]').type('test')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Username is required')
    })

    cy.get('.error-button').should('exist').click()

    cy.get('[data-test="error"]').should('not.exist')
  })

  it('should not be able to login with empty password field', () => {

    cy.get('[data-test="error"]').should('not.exist')
    cy.get('[data-test="username"]').type('test')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Password is required')
    })

    cy.get('.error-button').should('exist').click()

    cy.get('[data-test="error"]').should('not.exist')
  })

  it('should not be able to login with wrong password entry', () => {

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Username and password do not match any user in this service')
    })
  })


  it('should not be able to login with wrong username entry', () => {

    cy.get('[data-test="error"]').should('not.exist')
    cy.get('[data-test="username"]').type('user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('#login-button').click()

    cy.get('[data-test="error"]').should((el) => {
      expect(el.children()).to.have.attr('class', 'error-button')
      expect(el.text()).to.eq('Epic sadface: Username and password do not match any user in this service')
    })
  })

  it('should login successfully with standard_user username', () => {

    cy.loginAsStandardUser()
  })

  it('should login successfully with standard_user username by pressing enter key', () => {

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce{enter}')

    cy.get('.peek').should('exist') 
    cy.get('.product_label').contains('Products')
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('should logout after loging in succesfully', () => {

    cy.loginAsStandardUser()

    cy.get('.bm-burger-button > button').click()
    cy.get('#logout_sidebar_link').click()
    
    cy.get('[data-test="username"]').should('exist')
    cy.get('[data-test="password"]').should('exist')
  })
})