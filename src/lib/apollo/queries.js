import { gql } from "graphql-tag";
import {
  LIST_FRAGMENT,
  LIST_FRAGMENT_SHORT,
  USER_FRAGMENT_SHORT,
} from "./fragments";

export const LIST = gql`
  query GetList($id: ID, $filter: ListFilter) {
    list(id: $id, filter: $filter) {
      ...ListFragment
    }
  }
  ${LIST_FRAGMENT}
`;

export const LISTS = gql`
  query GetLists($auth_id: String!, $filter: ListFilter) {
    lists(auth_id: $auth_id, filter: $filter) {
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

/**
 * TODO: Make sure this is right
 */
export const RECIPES = gql`
  query GetRecipes($auth_id: String!) {
    lists(auth_id: $auth_id, filter: { is_recipe: true }) {
      items {
        ...ListFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;

export const USERS = gql`
  query Users($filter: UserFilter) {
    users(filter: $filter) {
      items {
        ...UserFragmentShort
      }
    }
  }
  ${USER_FRAGMENT_SHORT}
`;

export const ELEGANT_SHARED = gql`
  query GetShared($auth_id: String!) {
    lists(auth_id: $auth_id, filter: { author: { not: $auth_id } }) {
      items {
        ...ListFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;

// export const SHARED = gql`
//   query GetShared($auth_id: String!) {
//     shared(auth_id: $auth_id) {
//       items {
//         ...ListFragmentShort
//       }
//     }
//   }
//   ${LIST_FRAGMENT_SHORT}
// `;
