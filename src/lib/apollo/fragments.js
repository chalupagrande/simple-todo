import { gql } from "graphql-tag";

export const LIST_ITEM_FRAGMENT = gql`
  fragment ListItemFragment on ListItem {
    name
    status
  }
`;
export const LIST_FRAGMENT_SHORT = gql`
  fragment ListFragmentShort on List {
    id
    name
    isRecipe
    status
    lastStatusUpdate
    isDefault
  }
`;

export const LIST_FRAGMENT = gql`
  fragment ListFragment on List {
    id
    name
    isRecipe
    status
    lastStatusUpdate
    isDefault
    owner {
      id
      email
      name
      auth0Id
    }
  }
`;
