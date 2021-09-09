import { gql } from "graphql-tag";

export const CREATE_LIST = gql`
  mutation CreateList($data: JSONObject!) {
    createList(data: $data) {
      id
      name
      isRecipe
      items {
        name
        status
      }
      status
      owner {
        name
        email
        auth0Id
      }
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      success
    }
  }
`;
