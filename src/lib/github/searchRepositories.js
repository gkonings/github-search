import { getOctokit } from "./getOctokit";

export const searchRepositories = async ({
  search = "",
  sort = "stars",
  order = "desc",
  per_page = 10,
  page = 1,
  search_in = ["name"],
}) => {
  const octokit = getOctokit();

  const q = `"${search}" in:${search_in.join(",")}`;

  const {
    data: { items },
  } = await octokit.request(`GET /search/repositories`, {
    q,
    sort,
    order,
    per_page,
    page,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return items.map(({ id, full_name, stargazers_count }) => ({
    id,
    fullName: full_name,
    starCount: stargazers_count,
  }));
};
