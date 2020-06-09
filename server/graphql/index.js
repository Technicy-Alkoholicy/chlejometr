import fs from 'fs';
import path from 'path';

import { buildSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import graphqlHTTP from 'express-graphql';

const schema = importSchema(path.join(__dirname, 'schema/schema.graphql'));
import resolvers from './resolvers/resolvers';

export default app => {
  app.use(
    '/graphql',
    graphqlHTTP((req, res, graphQLParams) => ({
      schema: buildSchema(schema),
      rootValue: resolvers(req, res, graphQLParams),
      graphiql: true
    }))
  );
};
