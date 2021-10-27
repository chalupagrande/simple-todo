import { gql } from "graphql-tag";

export const LIST_FRAGMENT_SHORT = gql`
  fragment ListFragmentShort on List {
    id
    name
    is_parent
    status
    last_status_update
    is_default
    created_at
    updated_at
  }
`;

export const USER_FRAGMENT_SHORT = gql`
  fragment UserFragmentShort on User {
    id
    name
    email
  }
`;

export const LIST_FRAGMENT_WITH_AUTHOR = gql`
  fragment ListFragmentWithAuthor on List {
    ...ListFragmentShort
    author {
      ...UserFragmentShort
    }
  }
  ${LIST_FRAGMENT_SHORT}
  ${USER_FRAGMENT_SHORT}
`;

export const LIST_FRAGMENT = gql`
  fragment ListFragment on List {
    ...ListFragmentWithAuthor
    children {
      items {
        ...ListFragmentWithAuthor
      }
    }
    owners {
      items {
        ...UserFragmentShort
      }
    }
  }
  ${LIST_FRAGMENT_WITH_AUTHOR}
  ${USER_FRAGMENT_SHORT}
`;
