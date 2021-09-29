import { gql } from "graphql-tag";
import { LIST_FRAGMENT_SHORT } from "./fragments";

export const CREATE_LIST = gql`
  mutation CreateList(
    $data: JSONObject!
    $user: JSONObject!
    $parentList: JSONObject
  ) {
    createList(data: $data, user: $user, parentList: $parentList) {
      ...ListFragmentShort
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      success
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation UpdateList($id: ID!, $data: JSONObject!) {
    updateList(id: $id, data: $data) {
      ...ListFragmentShort
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;
