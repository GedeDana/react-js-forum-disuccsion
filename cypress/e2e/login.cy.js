/**
 * Login speac
 * 1. should display login page correctly
 * 2. should display alert when email is empty 
 * 3. should display alert when password is empty
 * 4. should display alert when username and passsword are wrong
 * 5. should display alert when username and password are correct 
 */


describe('login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  })

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
    
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).should('be.visible');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {

    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');
    cy.get('button').contains(/^Login$/).should('be.visible');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and passsword are wrong', () => {

    cy.get('input[placeholder="Email"]').type('testuser@gmail.com');
    cy.get('input[placeholder="Password"]').type('123456');

    cy.get('button').contains(/^Login$/).should('be.visible');

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display alert when username and passsword are correct', () => {

    cy.get('input[placeholder="Email"]').type('pakde@gmail.com');
    cy.get('input[placeholder="Password"]').type('123456');

    cy.get('button').contains(/^Login$/).click();

    cy.get('nav').should('be.visible');
    cy.get('nav').find('div:nth-child(2) button').should('be.visible');
    
  });
})