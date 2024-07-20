import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import {prismaClient} from "../clients/db"

export async function initServer() {
  const app = express();

  app.use(bodyParser.json());



  const graphqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            sayHello : String
            sayHelloToMe(name: String!): String

        }
        
        
        `,
    resolvers: {
      Query: {
        sayHello: () => 'Hello from Graphql Server',
        sayHelloToMe: (parent: any, {name}: {name: string}) => `Hey ${name}`
      },

    },
  });

  await graphqlServer.start();

  app.use('/graphql', expressMiddleware(graphqlServer));

  return app;
}
