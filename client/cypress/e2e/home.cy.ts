import { aliasQuery } from '../utils/graphql-test-utils';
import notifications from '../fixtures/notifications.json';
import ingredients from '../fixtures/ingredients.json';
import recipes from '../fixtures/recipes.json';
import recipeSingle from '../fixtures/recipes-single.json';

describe('Home', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/graphql', (req) => {
      aliasQuery(req, 'getNotifications', notifications);
      aliasQuery(req, 'getAllIngredients', ingredients);
      aliasQuery(req, 'getRecipes', recipes);
    });
  });

  it('should render search form', () => {
    cy.visit('http://localhost:3000/');
    cy.getByTestId('search-form-name').should('exist');
    cy.getByTestId('search-form-ingredient-select').should('exist');
    cy.getByTestId('search-form-difficulty-select').should('exist');
    cy.getByTestId('search-form-button').should('exist');
  });

  it('should render recipe card list', () => {
    cy.visit('http://localhost:3000/');
    cy.getByTestId('recipe-card-123456').should('exist');
    cy.getByTestId('recipe-card-123369').should('exist');
    cy.getByTestId('recipe-card-456789').should('exist');
  });

  it('should navigate to recipe page when recipe card is clicked', () => {
    cy.visit('http://localhost:3000/');
    cy.getByTestId('recipe-card-123369').click();
    cy.location('pathname').should('equal', '/recipe/123369');
  });

  it('should not display create recipe button when user is not logged in', () => {
    cy.visit('http://localhost:3000/');
    cy.getByTestId('home-create-recipe').should('not.exist');
  });

  it('should display create recipe button when user is logged in', () => {
    cy.login();
    cy.visit('http://localhost:3000/');
    cy.getByTestId('home-create-recipe').should('exist');
  });

  it('should navigate to create recipe page when create recipe button is clicked', () => {
    cy.login();
    cy.visit('http://localhost:3000/');
    cy.getByTestId('home-create-recipe').click();
    cy.location('pathname').should('equal', '/create');
  });

  it('should displayed filtered recipes by name', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept('http://localhost:3001/graphql', (req) => {
      aliasQuery(req, 'getRecipes', recipeSingle);
    });
    cy.getByTestId('search-form-name').find('input').clear().type('test recipe 1');
    cy.getByTestId('search-form-button').click();
    cy.getByTestId('recipe-card-123456').should('exist');
    cy.getByTestId('recipe-card-123369').should('not.exist');
    cy.getByTestId('recipe-card-456789').should('not.exist');
  });
});
