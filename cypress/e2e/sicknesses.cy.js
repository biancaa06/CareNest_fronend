describe('Sicknesses Page tests', () => {
    const login = (email, password) => {
      cy.visit('http://localhost:5173/login');
      cy.get('[data-cy="email"]').type(email);
      cy.get('[data-cy="password"]').type(password);
      cy.get('[data-cy="loginForm"]').submit();
      cy.url().should('eq', 'http://localhost:5173/');
    };

    const logout = () =>{
        cy.get('[data-cy="logoutButton"]').click();
    }

    it('should display the existing sicknesses', () => {
        login('admin@admin', 'admin');
        cy.visit('http://localhost:5173/sicknesses');
        cy.get('[data-cy="sicknessesList"]').should('be.visible');
        logout();
      });
  
    it('should create a new sickness', () => {
        login('admin@admin', 'admin');
        cy.visit('http://localhost:5173/sicknesses');
        cy.get('[data-cy="sicknessName"]').type('Test Sickness');
        cy.get('[data-cy="submitSickness"]').submit();
        cy.get('[data-cy="sicknessesList"]').should('contain', 'Test Sickness');
        logout();
      
    });

    it('should delete a new sickness', () => {
        login('admin@admin', 'admin');
        cy.visit('http://localhost:5173/sicknesses');
        cy.get('[data-cy="sicknessItem"]')
            .contains('Test Sickness')
            .parents('[data-cy="sicknessItem"]')
            .find('[data-cy="deleteSicknessButton"]')
            .click();
        cy.get('[data-cy="confirmDeleteButton"]').click();
        cy.get('[data-cy="sicknessesList"]').should('not.contain', 'Test Sickness');      
    });
  });
  