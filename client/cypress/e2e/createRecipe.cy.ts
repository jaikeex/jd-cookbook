import { aliasMutation } from '../utils/graphql-test-utils';
import createRecipe from '../fixtures/createRecipe.json';

describe('CreateRecipe', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept('http://localhost:3001/graphql', (req) => {
      aliasMutation(req, 'createRecipe', createRecipe);
    });
  });

  it('should display all create recipe form elements', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('create-form-name').should('exist');
    cy.getByTestId('create-form-cooking-time').should('exist');
    cy.getByTestId('create-form-difficulty').should('exist');
    cy.getByTestId('create-form-description').should('exist');
    cy.getByTestId('create-form-instructions').should('exist');
    cy.getByTestId('create-form-create-button').should('exist');
  });

  it('should display all ingredients related elements', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('ingredient-name-0').should('exist');
    cy.getByTestId('ingredient-amount-0').should('exist');
    cy.getByTestId('ingredient-delete-0').should('exist');
    cy.getByTestId('ingredient-add-button').should('exist');
  });

  it('should display only one ingredient input at load', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('ingredient-name-0').should('exist');
    cy.getByTestId('ingredient-amount-0').should('exist');
    cy.getByTestId('ingredient-name-1').should('not.exist');
    cy.getByTestId('ingredient-amount-1').should('not.exist');
  });

  it('should add ingredient input when add ingredient button is clicked', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('ingredient-add-button').click();
    cy.getByTestId('ingredient-name-1').should('exist');
    cy.getByTestId('ingredient-amount-1').should('exist');
  });

  it('should remove ingredient input when remove ingredient button is clicked', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('ingredient-add-button').click();
    cy.getByTestId('ingredient-add-button').click();
    cy.getByTestId('ingredient-name-2').should('exist');
    cy.getByTestId('ingredient-amount-2').should('exist');
    cy.getByTestId('ingredient-delete-2').click();
    cy.getByTestId('ingredient-name-2').should('not.exist');
    cy.getByTestId('ingredient-amount-2').should('not.exist');
  });

  it('should display errors for empty required fields', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('create-form-cooking-time').find('input').clear();
    cy.getByTestId('create-form-create-button').click();
    cy.contains('Name is required').should('have.class', 'Mui-error');
    cy.contains('Cooking time is required').should('have.class', 'Mui-error');
    cy.contains('Instructions are required').should('have.class', 'Mui-error');
  });

  it('should display errors for description over 255 characters', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('create-form-description')
      .find('[name="description"]')
      .type(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Aliquam ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.'
      );
    cy.getByTestId('create-form-create-button').click();
    cy.contains('Description must be at most 255 characters long').should('have.class', 'Mui-error');
  });

  it('should allow user to create recipe', () => {
    cy.visit('http://localhost:3000/create');
    cy.getByTestId('create-form-name').find('input').clear().type('test recipe name');
    cy.getByTestId('create-form-cooking-time').clear().type('10');
    cy.getByTestId('create-form-description').clear().type('test recipe description');
    cy.getByTestId('create-form-instructions').clear().type('test recipe instructions');
    cy.getByTestId('ingredient-amount-0').clear().type('1 bottle');
    cy.getByTestId('ingredient-name-0').clear().type('beer');

    cy.getByTestId('create-form-create-button').click();

    cy.contains('Recipe test recipe name successfully created').should('exist');
    cy.location('pathname').should('equal', '/recipe/123456');
  });
});
