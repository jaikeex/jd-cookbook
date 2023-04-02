import { createApi } from '@reduxjs/toolkit/query/react';
import { gql, GraphQLClient } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import type { Recipe, User } from 'types';

export interface GetAllRecipesResponse {
  getAllRecipes: Recipe[];
}

export interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  register: User;
}

export interface GetRecipeResponse {
  getRecipe: Recipe;
}

const client = new GraphQLClient('http://localhost:3001/graphql', { credentials: 'include' });

export const api = createApi({
  /* @ts-ignore */
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({
    register: builder.mutation<
      User,
      {
        email: string;
        password: string;
        username: string;
        avatar?: File;
      }
    >({
      query: ({ email, password, username, avatar }) => ({
        document: gql`
          mutation {
            register(input: {email: "${email}", password: "${password}", username: "${username}", avatar: ${
          avatar || null
        }}) {
              username
              avatar
            }
          }
        `
      })
    }),
    login: builder.query<
      any,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        document: gql`
          {
            login(email: "${email}", password: "${password}") {
              token
              user {
                username
                avatar
              }
            }
          }
        `
      }),
      transformResponse: (response: LoginResponse) => response.login
    }),
    logout: builder.query({
      query: () => ({
        document: gql`
          {
            logout
          }
        `
      }),
      transformResponse: (response: LoginResponse) => response.login
    }),
    getAllRecipes: builder.query<Recipe[], null>({
      query: () => ({
        document: gql`
          {
            getAllRecipes {
              _id
              createdAt
              user {
                username
              }
              name
              description
              picturePath
            }
          }
        `
      }),
      transformResponse: (response: GetAllRecipesResponse) => response.getAllRecipes
    }),
    getRecipe: builder.query<Recipe, { id: string; }>({
      query: ({ id }) => ({
        document: gql`
          {
            getRecipe (id: "${id}") {
              _id
              createdAt
              user {
                username
              }
              name
              likes
              description
              instructions
              picturePath
              likesCount
              ingredients {
                name
                amount
              }
            }
          }
        `
      }),
      transformResponse: (response: GetRecipeResponse) => response.getRecipe
    })
  })
});

export const { useGetAllRecipesQuery, useLazyLoginQuery } = api;
