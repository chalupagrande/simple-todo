import { gql } from "graphql-tag";
import { GraphQLJSONObject } from "graphql-type-json"; // DO NOT REMOVE

export const typeDefs = gql`
  scalar JSONObject # refers to the GraphQLJSONObject
  type ListResponse {
    items: [List]
  }

  type ListItem {
    name: String
    status: Boolean
  }

  type List {
    id: ID
    name: String
    items: [ListItem]
    status: StatusTypes
    owner: User
    shared: UserListResponse
    isRecipe: Boolean
  }

  type DeleteListResponse {
    success: Boolean
  }

  type Query {
    lists: ListResponse
    test: SuccessResponse
  }

  type Mutation {
    createList(data: JSONObject!): List
    deleteList(id: ID!): DeleteListResponse
  }

  type User {
    auth0Id: String
    name: String
    email: String
  }

  type UserListResponse {
    items: [User]
  }

  type SuccessResponse {
    success: Boolean
  }

  enum StatusTypes {
    NOT_STARTED
    STARTED
    COMPLETED
  }
`;
