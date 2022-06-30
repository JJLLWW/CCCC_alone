import { gql } from 'apollo-server-express';

export default gql`
    # hello there
    type HWorld {
        text: String!
    }

    type DBEntry {
       field1: Int,
       field2: Boolean
    }

    type Query {
        hworld: HWorld
        dbentry: [DBEntry]
    }
`;
