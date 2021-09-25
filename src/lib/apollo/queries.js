import { gql } from "graphql-tag";
import { LIST_FRAGMENT_SHORT } from "./fragments";

export const LISTS = gql`
  query GetLists($auth0Id: String) {
    lists(auth0Id: $auth0Id) {
      items {
        ...ListFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;
