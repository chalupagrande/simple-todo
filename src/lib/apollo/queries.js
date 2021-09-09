import { gql } from "graphql-tag";
import { LIST_FRAGMENT } from "./fragments";

export const LISTS = gql`
  query {
    lists {
      items {
        ...ListFragment
      }
    }
  }
  ${LIST_FRAGMENT}
`;
