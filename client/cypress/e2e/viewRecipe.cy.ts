import { aliasMutation, aliasQuery } from '../utils/graphql-test-utils';
import getRecipe from '../fixtures/getRecipe.json';
import likeRecipe from '../fixtures/likeRecipe.json';
import getComments from '../fixtures/getComments.json';

describe('ViewRecipe', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/graphql', (req) => {
      aliasMutation(req, 'getRecipe', getRecipe);
      aliasMutation(req, 'likeRecipe', likeRecipe);
      aliasQuery(req, 'getComments', getComments);
    });
  });

  it('should display all view recipe elements', () => {
    cy.visit('http://localhost:3000/recipe/64298c8b332327727ddaddf1');
    cy.getByTestId('recipe-image-64298c8b332327727ddaddf1').should('exist');
    cy.getByTestId('recipe-author-link').should('exist');
    cy.getByTestId('recipe-like-button').should('exist');
    cy.getByTestId('recipe-info-cooking-time').should('exist');
    cy.getByTestId('recipe-info-difficulty').should('exist');
    cy.getByTestId('recipe-description').should('exist');
    cy.getByTestId('recipe-instructions').should('exist');
    cy.getByTestId('recipe-ingredients').should('exist');
    cy.getByTestId('recipe-comment-submit').should('exist');
    cy.getByTestId('recipe-comment-input').should('exist');
  });

  it('should display loaded comments', () => {
    cy.visit('http://localhost:3000/recipe/64298c8b332327727ddaddf1');
    cy.getByTestId('recipe-comment-0').should('exist').and('contain.text', 'This is a test comment');
    cy.getByTestId('recipe-comment-1').should('exist').and('contain.text', 'Another test comment');
  });

  it('should display like button as disabled if user is not logged in', () => {
    cy.visit('http://localhost:3000/recipe/64298c8b332327727ddaddf1');
    cy.getByTestId('recipe-like-button').find('input').should('be.disabled');
  });

  it('should navigate to author profile if author name is clicked', () => {
    cy.visit('http://localhost:3000/recipe/64298c8b332327727ddaddf1');
    cy.getByTestId('recipe-author-link').click();
    cy.location('pathname').should('equal', '/profile/456789');
  });
});
