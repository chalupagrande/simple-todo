import { gql } from "graphql-tag";
import { LIST_FRAGMENT, LIST_FRAGMENT_SHORT } from "./fragments";

export const CREATE_LIST = gql`
  mutation CreateList(
    $data: JSONObject!
    $user: JSONObject!
    $parentList: JSONObject
  ) {
    createList(data: $data, user: $user, parentList: $parentList) {
      ...ListFragment
    }
  }
  ${LIST_FRAGMENT}
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      success
    }
  }
`;

export const UPDATE_LIST_STATUS = gql`
  mutation UpdateListStatus($id: ID!, $status: String!) {
    updateListStatus(id: $id, status: $status) {
      ...ListFragmentShort
    }
  }
  ${LIST_FRAGMENT_SHORT}
`;
