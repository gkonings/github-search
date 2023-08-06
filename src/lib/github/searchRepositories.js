import { getOctokit } from "./getOctokit";

const query = `
query($search: String!) {
  search(type: REPOSITORY, query: $search, first: 10) {
    nodes {
      ... on Repository {
        id
        name
      }
    }
  }
}`;

export const searchRepositories = async ({ search = "" }) => {
  const octokit = getOctokit();

  const {
    search: { nodes },
  } = await octokit.graphql(query, {
    search,
  });

  return nodes;
};
