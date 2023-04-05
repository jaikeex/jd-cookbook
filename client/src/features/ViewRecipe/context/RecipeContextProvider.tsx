import * as React from 'react';
import type { Recipe } from 'core';
import { createContext, useContext } from 'react';

interface RecipeContextValue {
  recipe: Recipe;
}

interface RecipeContextProviderProps extends React.PropsWithChildren {
  recipe: Recipe;
}

const RecipeContext = createContext<RecipeContextValue>({} as RecipeContextValue);

export const useRecipeContext = () => useContext(RecipeContext);

const RecipeContextProvider: React.FC<RecipeContextProviderProps> = ({ children = null, recipe }) => {
  return <RecipeContext.Provider value={{ recipe }}>{children}</RecipeContext.Provider>;
};

export default RecipeContextProvider;
