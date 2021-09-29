import { gql } from "graphql-tag";
import { LIST_FRAGMENT } from "./fragments";

export const LIST = gql`
  query GetList($id: ID, $auth0Id: String!, $filter: ListFilter) {
    list(id: $id, auth0Id: $auth0Id, filter: $filter) {
      ...ListFragment
    }
  }
  ${LIST_FRAGMENT}
`;

export const LISTS = gql`
  query GetLists($auth0Id: String!, $filter: ListFilter) {
    lists(auth0Id: $auth0Id, filter: $filter) {
      items {
        ...ListFragment
      }
    }
  }
  ${LIST_FRAGMENT}
`;

export const CHECK_USER = gql`
  query CheckUser($user: JSONObject!) {
    checkUser(user: $user) {
      success
    }
  }
`;

export const RECIPES = gql`
  query GetRecipes($auth0Id: String!) {
    lists(auth0Id: $auth0Id, filter: { isDefault: false, isParent: true }) {
      items {
        ...ListFragment
      }
    }
  }
  ${LIST_FRAGMENT}
`;
