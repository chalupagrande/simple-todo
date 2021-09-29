import { gql } from "graphql-tag";
import { GraphQLJSONObject } from "graphql-type-json"; // DO NOT REMOVE
const { GraphQLScalarType, Kind } = require("graphql");

export const typeDefs = gql`
  scalar JSONObject # refers to the GraphQLJSONObject
  scalar Date

  input ListFilter {
    id: ID
    isParent: Boolean
    isDefault: Boolean
    name: String
  }

  type ListResponse {
    items: [List]
  }

  type List {
    id: ID
    name: String
    status: StatusTypes
    owner: User
    shared: UserListResponse
    lastStatusUpdate: Date
    isParent: Boolean
    isDefault: Boolean
    children: ListResponse
  }

  type DeleteListResponse {
    success: Boolean
  }

  type Query {
    list(id: ID, auth0Id: String!, filter: ListFilter): List
    lists(auth0Id: String!, filter: ListFilter): ListResponse
    checkUser(user: JSONObject!): SuccessResponse
  }

  type Mutation {
    createList(
      data: JSONObject!
      user: JSONObject!
      parentList: JSONObject
    ): List
    deleteList(id: ID!): DeleteListResponse
    updateList(id: ID!, data: JSONObject!): List
  }

  type User {
    id: ID
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

/**
 * CUSTOM SCALAR:
 */

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
