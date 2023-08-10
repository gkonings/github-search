/* eslint-disable import/prefer-default-export */
import { getOctokit } from "./getOctokit";

export const getLoggedInUser = async () => {
  const octokit = getOctokit();

  const {
    data: { avatar_url: avatarUrl, name, url },
  } = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return { avatarUrl, name, url };
};
