describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
      });
  
    it('should display the login form', () => {
      cy.get('[data-cy="loginForm"]').should('be.visible');
      cy.get('#email').should('be.visible').and('have.attr', 'placeholder', 'Enter your email');
      cy.get('#password').should('be.visible').and('have.attr', 'placeholder', 'Enter your password');
      cy.contains('Login').should('be.visible');
    });
  
    it('should show an error message for invalid credentials', () => {

      cy.get('#email').type('invalid@example.com');
      cy.get('#password').type('wrongpassword');
      cy.get('[data-cy="loginForm"]').submit();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Login failed! Please check your credentials.');
      });
    });
  
    it('should log in successfully and redirect to the homepage', () => {

      cy.get('[data-cy="email"]').type('user@user.com');
      cy.get('[data-cy="password"]').type('user');
      cy.get('[data-cy="loginForm"]').submit();
  
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });
  