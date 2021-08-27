import { gql } from "graphql-tag";
export const ListFragment = gql`
  fragment ListFragment on List {
    _id
    name
  }
`;

export const LISTS = gql`
  query {
    lists {
      items {
        _id
        name
      }
    }
  }
`;
