import { gql } from "graphql-tag";
export const LIST_ITEM_FRAGMENT = gql`
  fragment ListItemFragment on ListItem {
    name
    status
  }
`;

export const LIST_FRAGMENT = gql`
  fragment ListFragment on List {
    id
    name
    isRecipe
    status
    items {
      ...ListItemFragment
    }
    owner {
      name
      email
    }
    shared {
      items {
        name
        email
      }
    }
  }
  ${LIST_ITEM_FRAGMENT}
`;

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
