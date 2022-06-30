// we need to do some webpack mumbo jumbo to get the inputs to work properly

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { PORT } from '../src/ports';

async function start() {
  const client = new ApolloClient({
    uri: `http://localhost:${PORT}`,
    cache: new InMemoryCache(),
  });

  window.onkeypress = (ev) => ev;

  // try and read data from the database
  const obj = await client.query(gql`
    query ReadEntireDB {
        DBEntry {
            field1
            field2
        }
    }
  `);
}

start();
