describe('Register', () => {
  it('should display all register form elements', () => {
    cy.visit('http://localhost:3000/auth/register');
    cy.getByTestId('register-form-username').should('exist');
    cy.getByTestId('register-form-email').should('exist');
    cy.getByTestId('register-form-password').should('exist');
    cy.getByTestId('register-form-confirm-password').should('exist');
    cy.getByTestId('register-form-button').should('exist');
    cy.getByTestId('register-form-link').should('exist');
  });

  it('should display errors for empty fields', () => {
    cy.visit('http://localhost:3000/auth/register');
    cy.getByTestId('register-form-button').click();
    cy.contains('Username is required').should('have.class', 'Mui-error');
    cy.contains('E-mail is required').should('have.class', 'Mui-error');
    cy.contains('Password is required').should('have.class', 'Mui-error');
    cy.contains('You must confirm your password').should('have.class', 'Mui-error');
  });

  it('should display errors if passwords do not match', () => {
    cy.visit('http://localhost:3000/auth/register');
    cy.getByTestId('register-form-password').find('input').clear().type('password123');
    cy.getByTestId('register-form-confirm-password').find('input').clear().type('password789');
    cy.getByTestId('register-form-button').click();
    cy.contains('Passwords must match').should('have.class', 'Mui-error');
  });

  it('should navigate user to register form when link is clicked', () => {
    cy.visit('http://localhost:3000/auth/register');
    cy.getByTestId('register-form-link').click();
    cy.location('pathname').should('equal', '/auth/login');
  });

  it('should allow user to register new account', () => {
    cy.intercept('http://localhost:3001/graphql', { fixture: 'login.json' });
    cy.visit('http://localhost:3000/auth/register');
    cy.getByTestId('register-form-username').find('input').clear().type('hello');
    cy.getByTestId('register-form-email').find('input').clear().type('hello@example.com');
    cy.getByTestId('register-form-password').find('input').clear().type('password123');
    cy.getByTestId('register-form-confirm-password').find('input').clear().type('password123');
    cy.getByTestId('register-form-button').click();
    cy.location('pathname').should('equal', '/auth/login');
  });
});
