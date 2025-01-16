describe('Profile Page Tests', () => {
    const loginAsPatient = () => {
        cy.visit('http://localhost:5173/login');
        cy.get('[data-cy="email"]').type('user@user.com');
        cy.get('[data-cy="password"]').type('user');
        cy.get('[data-cy="loginForm"]').submit();
  
        cy.url().should('eq', 'http://localhost:5173/');
    };

    const logout = () =>{
        cy.get('[data-cy="logoutButton"]').click();
    }

    it('should not be seen when not logged in', () => {
      cy.visit('http://localhost:5173/profile');

      cy.get('[data-cy="profilePage"]').should('not.exist');
    });

    
    it('should display the logged-in user\'s profile with their name', () => {
        loginAsPatient();
    
        cy.window().then((win) => {
          const token = win.localStorage.getItem('accessToken');
          expect(token).to.exist;
    
          cy.decodeToken(token).then((decodedToken) => {
            const userId = decodedToken.userId;
            expect(userId).to.exist;
            console.log('Decoded User ID:', userId);
        
            // Use the userId dynamically
            cy.visit(`http://localhost:5173/profile/${userId}`);
            cy.get('[data-cy="personalData"]').should('be.visible');
          });
        });

        logout();
    });

    it('should block a user who tries to see other\'s profile', () => {
        loginAsPatient();
    
        cy.window().then((win) => {
          const token = win.localStorage.getItem('accessToken');
          expect(token).to.exist;
    
          cy.decodeToken(token).then((decodedToken) => {
            const userId = decodedToken.userId;
            expect(userId).to.exist;
            console.log('Decoded User ID:', userId);
        
            cy.visit(`http://localhost:5173/profile/${userId-1}`);
            cy.get('[data-cy="unauthorizedCard"]').should('be.visible');
          });
        });

        logout();
    });

    it('should expand the address input fields on click', () => {
        loginAsPatient();
    
        cy.window().then((win) => {
          const token = win.localStorage.getItem('accessToken');
          expect(token).to.exist;
    
          cy.decodeToken(token).then((decodedToken) => {
            const userId = decodedToken.userId;
            expect(userId).to.exist;
            console.log('Decoded User ID:', userId);
        
            cy.visit(`http://localhost:5173/profile/${userId}`);
            cy.get('[data-cy="editAddressButton"]').click();
          });
        });
    });

})