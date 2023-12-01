// Imports
import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query PostsData($filter: String!) {
    posts(filter: $filter) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          _id
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;

export const REACT_POST = gql`
  mutation ReactPost($postId: ID!, $reaction: String!) {
    reactPost(postId: $postId, reaction: $reaction) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;

export const REMOVE_REACTION_FROM_POST = gql`
  mutation RemoveReactionFromPost($postId: ID!) {
    removeReactionFromPost(postId: $postId) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation AddPost($post: PostInput!) {
    addPost(post: $post) {
      statusCode
      success
      message
      data {
        _id
        content
        author {
          role
          firstName
          middleName
          lastName
        }
        published
        createdAt
        updatedAt
        reactions {
          react
          user
        }
      }
    }
  }
`;
