import { gql } from "@apollo/client";

// Query to get all the 50 popular repos
export const POPULAR_REPOS = gql`
  query PopularJavascriptRepos($first: Int!, $last: Int) {
    search(
      query: "language:JavaScript"
      type: REPOSITORY
      first: $first
      last: $last
    ) {
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
