describe('Access Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the navbar', () => {
    cy.get('[data-cy="navbar"]').should('be.visible');
  });

  it('should contain the correct navbar links when user is not logged in', () => {
    cy.get('[data-cy="navbar"]').within(() => {
      cy.contains('Home').should('exist');
      cy.contains('Announcements').should('exist');
      cy.contains('Caretakers').should('exist');
      cy.contains('Login').should('exist');
    });
  });

  it('should navigate to the Announcements page when clicking the link', () => {
    cy.get('[data-cy="navbar"]').contains('Announcements').click();

    cy.url().should('include', '/announcements');

    cy.contains('Announcements').should('exist');
  });
});
