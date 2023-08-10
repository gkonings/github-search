/* eslint-disable import/prefer-default-export */
import { Octokit } from "octokit";

export const getOctokit = () => {
  const auth = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;
  return new Octokit({ auth });
};
