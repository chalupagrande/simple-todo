import { gql } from "graphql-tag";

export const LIST_FRAGMENT_SHORT = gql`
  fragment ListFragmentShort on List {
    id
    name
    is_parent
    status
    last_status_update
    is_default
  }
`;

export const USER_FRAGMENT_SHORT = gql`
  fragment UserFragmentShort on User {
    id
    name
    email
  }
`;

export const LIST_FRAGMENT = gql`
  fragment ListFragment on List {
    ...ListFragmentShort
    children {
      items {
        ...ListFragmentShort
      }
    }
    author {
      ...UserFragmentShort
    }
    owners {
      items {
        ...UserFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_SHORT}
  ${USER_FRAGMENT_SHORT}
`;
