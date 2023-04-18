describe('Login', () => {
  it('should redirect user to login page when accessing protected routes', () => {
    cy.visit('http://localhost:3000/create');
    cy.location('pathname').should('equal', '/auth/login');
  });

  it('should display all login form elements', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.getByTestId('login-form-email').should('exist');
    cy.getByTestId('login-form-password').should('exist');
    cy.getByTestId('login-form-button').should('exist');
    cy.getByTestId('login-form-register').should('exist');
  });

  it('should display errors for empty email and password', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.getByTestId('login-form-button').click();
    cy.contains('E-mail is required').should('have.class', 'Mui-error');
    cy.contains('Password is required').should('have.class', 'Mui-error');
  });

  it('should display error for invalid email format', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.getByTestId('login-form-email').find('input').clear().type('hello');
    cy.getByTestId('login-form-button').click();
    cy.contains('Invalid email').should('have.class', 'Mui-error');

    cy.getByTestId('login-form-email').find('input').clear().type('hello@.com');
    cy.getByTestId('login-form-button').click();
    cy.contains('Invalid email').should('have.class', 'Mui-error');
  });

  it('should navigate user to register form when link is clicked', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.getByTestId('login-form-register').click();
    cy.location('pathname').should('equal', '/auth/register');
  });

  it('should allow user to log in', () => {
    cy.intercept('http://localhost:3001/graphql', { fixture: 'login.json' });
    cy.visit('http://localhost:3000/auth/login');
    cy.getByTestId('login-form-email').find('input').clear().type('hello@example.com');
    cy.getByTestId('login-form-password').find('input').clear().type('password123');
    cy.getByTestId('login-form-button').click();
    cy.location('pathname').should('equal', '/');
  });
});
