require('dotenv').config();
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { User } from './user';

import JWTService from '../services/jwt';
import { GraphQLContext } from 'interfaces/_graphql/gql_interfaces';

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const graphqlServer = new ApolloServer<GraphQLContext>({
    typeDefs: `

      ${User.types}

        type Query {
            ${User.queries}
        }       
         
        `,

    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
    },
  });

  await graphqlServer.start();

  app.use(
    '/graphql',
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        const authToken = req.headers.authorization;
        let user;
        user = authToken?.startsWith('Bearer ')
          ? JWTService.decodeToken(authToken.split('Bearer ')[1])
          : JWTService.decodeToken(authToken as string);

        return {
          user,
        };
      },
    })
  );

  return app;
}
