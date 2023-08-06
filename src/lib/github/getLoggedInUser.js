import { getOctokit } from "./getOctokit";

const query = `
{
  viewer {
    login
    avatarUrl
    url
  }
}`;

export const getLoggedInUser = async () => {
  const octokit = getOctokit();

  const { viewer } = await octokit.graphql(query);

  return viewer;
};
