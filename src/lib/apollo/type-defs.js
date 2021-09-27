import { gql } from "graphql-tag";
import { GraphQLJSONObject } from "graphql-type-json"; // DO NOT REMOVE
const { GraphQLScalarType, Kind } = require("graphql");

export const typeDefs = gql`
  scalar JSONObject # refers to the GraphQLJSONObject
  scalar Date

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
    lastStatusUpdate: Date
  }

  type DeleteListResponse {
    success: Boolean
  }

  type Query {
    lists(auth0Id: String!): ListResponse
    checkUser(user: JSONObject!): SuccessResponse
  }

  type Mutation {
    createList(
      data: JSONObject!
      user: JSONObject!
      parentList: JSONObject
    ): List
    deleteList(id: ID!): DeleteListResponse
    updateListStatus(id: ID!, status: String!): List
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
