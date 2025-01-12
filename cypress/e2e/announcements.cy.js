describe('Announcements Page', () => {
    const loginAsPatient = () => {
      cy.visit('http://localhost:5173/login');
      cy.get('[data-cy="email"]').type('user@user.com');
      cy.get('[data-cy="password"]').type('user');
      cy.get('[data-cy="loginForm"]').submit();

      cy.url().should('eq', 'http://localhost:5173/');
    };
  
    it('should show unauthorized message when not logged in', () => {
      cy.visit('http://localhost:5173/announcements');
  
      cy.get('[data-cy="loginForm"]').should('be.visible');
    });
  
    it('should display announcements when logged in as a patient', () => {
      loginAsPatient();
  
      cy.visit('http://localhost:5173/announcements');
  
      cy.contains('Health Announcements').should('be.visible');
      cy.get('[data-cy="announcement-item"]').should('have.length.greaterThan', 0);
    });
  });
  