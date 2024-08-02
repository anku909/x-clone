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
        const authHeader = req.headers.authorization;
        let user;
  
        if (authHeader) {
          
          try {
            if (authHeader.startsWith("Bearer ")) {
              const token = authHeader.split("Bearer ")[1];
              user = JWTService.decodeToken(token);      
              
            } else {
              user = JWTService.decodeToken(authHeader);
              
              
            }
          } catch (error) {
            console.error("Failed to decode token:", error);
            // Return a context indicating authentication failure
            return { user: null };
          }
        } else {
          // No authorization header provided
          return { user: null };
        }
  
        return { user };
      },
    })
  );
  
  

  return app;
}
