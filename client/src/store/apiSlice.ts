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

const client = new GraphQLClient('http://localhost:3001/graphql', { credentials: 'include' });

export const api = createApi({
  /* @ts-ignore */
  baseQuery: graphqlRequestBaseQuery({ client }),
  endpoints: (builder) => ({
    login: builder.query<
      any,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        credentials: 'include',
        document: gql`
          {
            login(email: "${email}", password: "${password}") {
              token
              user {
                _id,
                username,
                avatar
              }
            }
          }
        `
      }),
      transformResponse: (response: LoginResponse) => response.login
    }),
    logout: builder.query<
      any,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        credentials: 'include',
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
        credentials: 'include',
        document: gql`
          {
            getAllRecipes {
              _id
              createdAt
              user {
                username
                avatar
              }
              name
              likes
              description
              ingredients {
                name
                amount
              }
            }
          }
        `
      }),
      transformResponse: (response: GetAllRecipesResponse) => response.getAllRecipes
    })
  })
});

export const { useGetAllRecipesQuery, useLazyLoginQuery } = api;
