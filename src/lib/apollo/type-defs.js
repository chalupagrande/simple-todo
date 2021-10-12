import { gql } from "graphql-tag";
import { GraphQLJSONObject } from "graphql-type-json"; // DO NOT REMOVE
const { GraphQLScalarType, Kind } = require("graphql");

/**
 *
 *
 *  _____ ___  ___   ___
 * |_   _/ _ \|   \ / _ \
 *   | || (_) | |) | (_) |
 *   |_| \___/|___/ \___/
 *
 * TODO
 * There is a better way to write a filters... (ie like 8base's filter system)
 * but the goal of this project is not to reinvent what 8base has done and the complexity of
 * their system. so... if you are reading this... pretend that I took the time to write
 * a really complex, universal and interesting graphql schema. And that I didnt
 * treat it like a REST api....
 *
 *
 */

export const typeDefs = gql`
  scalar JSONObject # refers to the GraphQLJSONObject
  scalar Date

  # PREDICATES
  input StringPredicate {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    contains: String
    startsWith: String
    endsWith: String
    AND: [StringPredicate]
    OR: [StringPredicate]
    NOT: [StringPredicate]
  }

  input IdPredicate {
    equals: String
    not: String
    in: [String]
    notIn: [String]
    contains: String
    startsWith: String
    endsWith: String
    AND: [StringPredicate]
    OR: [StringPredicate]
    NOT: [StringPredicate]
  }

  input DatePredicate {
    equals: Date
    not: Date
    in: [Date]
    notIn: [Date]
    lt: Date
    lte: Date
    gt: Date
    gte: Date
    AND: [DatePredicate]
    OR: [DatePredicate]
    NOT: [DatePredicate]
  }

  # FILTERS

  input ListFilter {
    id: IdPredicate
    name: StringPredicate
    is_parent: Boolean
    is_default: Boolean
    status: StringPredicate
    created_at: DatePredicate
    updated_at: DatePredicate
    last_status_update: DatePredicate
    author: IdPredicate
    AND: [ListFilter]
    OR: [ListFilter]
    NOT: [ListFilter]
  }

  input UserFilter {
    id: IdPredicate
    name: StringPredicate
    email: StringPredicate
    created_at: DatePredicate
    updated_at: DatePredicate
  }

  # RESPONSES

  type ListResponse {
    items: [List]
  }

  type UserListResponse {
    items: [User]
  }

  type SuccessResponse {
    success: Boolean
  }

  type DeleteListResponse {
    success: Boolean
  }

  # MAIN TYPES

  type User {
    id: ID
    auth_id: String
    name: String
    email: String
  }

  type List {
    id: ID
    name: String
    status: StatusTypes
    owner: User
    shared: UserListResponse
    last_status_update: Date
    is_parent: Boolean
    is_default: Boolean
    children: ListResponse
    author: User
    owners: UserListResponse
  }

  # ENUMS

  enum StatusTypes {
    NOT_STARTED
    STARTED
    COMPLETED
  }

  # QUERY AND MUTATION

  type Query {
    list(id: ID, filter: ListFilter): List
    lists(auth_id: String!, filter: ListFilter): ListResponse
    shared(auth_id: String!): ListResponse
    checkUser(user: JSONObject!): SuccessResponse
    users(filter: UserFilter): UserListResponse
  }

  type Mutation {
    createList(
      data: JSONObject!
      user: JSONObject!
      parentList: JSONObject
    ): List
    deleteList(id: ID!): DeleteListResponse
    updateList(id: ID!, data: JSONObject!): List
    shareList(id: ID!, userId: ID!): SuccessResponse
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
