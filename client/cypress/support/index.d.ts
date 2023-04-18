declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get an element by its data-testid attribute value.
     * @example
     * cy.getByTestId('login-form-email')
     */
    getByTestId(testId: string): Chainable<Subject>;
    login(): Chainable<Subject>;
  }
}
