/* eslint-disable import/prefer-default-export, camelcase */
import { getOctokit } from "./getOctokit";

const createSearchString = ({
  search,
  language,
  search_in = ["name", "description", "topics", "readme"],
}) => {
  const languageString = language ? ` language:${language}` : "";
  const searchInString = search_in.length ? ` in:${search_in.join(",")}` : "";
  const q = `"${search}"${languageString}${searchInString}`;

  return q;
};

export const searchRepositories = async ({
  search = "",
  sort = "stars",
  order = "desc",
  per_page = 10,
  page = 1,
  language,
  search_in,
}) => {
  const octokit = getOctokit();

  const q = createSearchString({ search, language, search_in });
  console.log({ search, q });

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

  // console.log({ result: items[0] });

  return items.map(
    ({
      description,
      full_name,
      id,
      language: resultLanguage,
      owner,
      stargazers_count,
      html_url,
      watchers_count,
    }) => ({
      description,
      fullName: full_name,
      id,
      language: resultLanguage,
      owner: {
        avatarUrl: owner.avatar_url,
        name: owner.login,
      },
      starCount: stargazers_count,
      followerCount: watchers_count,
      url: html_url,
    }),
  );
};
