import { gql } from "graphql-tag";

export const typeDefs = gql`
  type ListResponse {
    items: [List]
  }

  type ListItem {
    _id: ID
    name: String
    status: Boolean
  }

  type List {
    _id: ID
    name: String
    items: [ListItem]
    status: Boolean
  }

  type DeleteListResponse {
    success: Boolean
  }

  type Query {
    lists: ListResponse
  }

  type Mutation {
    createList(name: String): List
    deleteList(_id: ID!): DeleteListResponse
  }
`;
