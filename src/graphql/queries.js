import { gql } from "@apollo/client";

export const POPULAR_REPOS = gql`
  {
    search(query: "language:JavaScript", type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            description
            owner {
              avatarUrl
              ... on User {
                name
              }
              ... on Organization {
                avatarUrl
                name
              }
            }
            openGraphImageUrl
            issues(orderBy: { field: CREATED_AT, direction: DESC }) {
              totalCount
            }
            stargazers(orderBy: { field: STARRED_AT, direction: DESC }) {
              totalCount
            }
            createdAt
          }
        }
      }
    }
  }
`;
