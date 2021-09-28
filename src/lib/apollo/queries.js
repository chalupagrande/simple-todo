import { gql } from "graphql-tag";
import { LIST_FRAGMENT_SHORT } from "./fragments";

export const LISTS = gql`
  query GetLists($id: ID, $auth0Id: String!) {
    lists(id: $id, auth0Id: $auth0Id, filter: { isDefault: false }) {
      parent {
        ...ListFragmentShort
      }
      items {
        ...ListFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
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
    lists(auth0Id: $auth0Id, filter: { isRecipe: true, isDefault: false }) {
      items {
        ...ListFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;
