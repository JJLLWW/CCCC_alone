// we need to do some webpack mumbo jumbo to get the inputs to work properly

import {
  ApolloClient, InMemoryCache, gql, HttpLink,
} from '@apollo/client/core';
import fetch from 'cross-fetch';
import { PORT } from '../src/ports';

async function start() {
  console.log(`trying to connect to http://localhost:${PORT}/graphql`);
  const client = new ApolloClient({
    link: new HttpLink({ uri: `http://localhost:${PORT}/graphql`, fetch }),
    cache: new InMemoryCache(),
  });

  // try and read data from the database
  const obj = await client.query({
    query: gql`
    query ReadEntireDB {
        dbentry {
            field1
            field2
        }
    }
  `,
  });
  const entries = obj.data.dbentry;
  entries.forEach((e: any) => {
    console.log(e.field1, e.field2);
  });
}

start();
