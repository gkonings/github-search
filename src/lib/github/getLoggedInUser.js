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

  const {
    data,
    data: { avatar_url: avatarUrl, name, url },
  } = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return { avatarUrl, name, url };
};
