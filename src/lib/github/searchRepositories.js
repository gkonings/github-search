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
  console.log({ search, q });

  const {
    data: { items },
  } = await octokit.request(`GET /search/repositories`, {
    q: search,
    sort,
    order,
    per_page,
    page,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  console.log({ result: items[0] });

  return items.map(
    ({
      description,
      full_name,
      id,
      language,
      owner,
      stargazers_count,
      html_url,
      watchers_count,
    }) => ({
      description,
      fullName: full_name,
      id,
      language,
      owner: {
        avatarUrl: owner.avatar_url,
        name: owner.login,
      },
      starCount: stargazers_count,
      followerCount: watchers_count,
      url: html_url,
    })
  );
};
