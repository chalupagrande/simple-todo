import { gql } from "graphql-tag";

export const CREATE_LIST = gql`
  mutation CreateList($name: String) {
    createList(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($_id: ID!) {
    deleteList(_id: $_id) {
      success
    }
  }
`;
