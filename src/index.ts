// typescript only handles ES6 imports not CommonJS require by default.
import express from 'express';
import { ApolloServer, ExpressContext, gql } from 'apollo-server-express';
import { Sequelize, DataType, DataTypes } from 'sequelize';

import { PORT } from './ports';

// eslit mistake, still finds the file
import typedefs from './schema/schema1';

async function start() {
// connect to EXISTING postgres db
  const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'testdb',
    username: 'postgres',
    password: 'password',
  });

  try {
    await sequelize.authenticate();
    console.log('connected to db');
  } catch {
    console.log("couldn't connect to db");
    return;
  }

  // model is a table in the db, each "attribute" is a column of the table.
  const Table1 = sequelize.define('Table1', {
    field1: {
      type: DataTypes.INTEGER,
    },
    field2: {
      type: DataTypes.BOOLEAN,
    },
  });

  // wtf does this do?
  Table1.sync();

  // this creates a row in the table chosen
  //   Table1.create({ name: 'My_Table' });

  // we want an actual row
  //   const row = Table1.build({ field1: 69, field2: false });
  //   row.save();

  // read the rows of the database
  //   const entries = await Table1.findAll();
  //   console.log(entries);

  // hardcoded data, must match type expected.
  const data = {
    text: 'sajbdsabdjab',
  };
  const resolvers = {
    Query: {
      hworld() {
        return data;
      },
      async dbentry() {
        return Table1.findAll();
      },
    },
  };

  const app = express();

  const GqlServer = new ApolloServer({
    typeDefs: typedefs,
    resolvers,
  });

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  // graphiql, some way to test whether this is working?
  await GqlServer.start();
  GqlServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}

start();
