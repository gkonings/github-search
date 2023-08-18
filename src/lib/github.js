/* eslint-disable import/prefer-default-export, camelcase */
import { Octokit } from "octokit";

const createSearchString = ({
  search,
  language,
  stars,
  followers,
  search_in = ["name", "description", "topics", "readme"],
}) => {
  const starsString = stars ? `stars:${stars}` : false;
  const followersString = followers ? `followers:${followers}` : false;
  const languageString = language ? `language:${language}` : false;
  const searchInString = search_in.length ? `in:${search_in.join(",")}` : false;

  const q = `"${search}" ${[
    starsString,
    followersString,
    languageString,
    searchInString,
  ]
    .filter(Boolean)
    .join(" ")}`;

  return q;
};

export const searchRepositories = async (query) => {
  const { sort = "stars", order = "desc", per_page = 10, page = 1 } = query;
  const octokit = new Octokit();

  const q = createSearchString(query);

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

  return items;
};
