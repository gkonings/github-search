import { searchRepositories } from "./github";

const request = jest.fn(() => ({
  data: {
    items: [],
  },
}));
jest.mock("octokit", () => ({
  Octokit: jest.fn(() => ({
    request,
  })),
}));

describe("createSearchString", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("passes a simple search", () => {
    searchRepositories({ search: "react" });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        q: '"react" in:name,description,topics,readme',
      }),
    );
  });

  it("passes a filtered search for stars", () => {
    searchRepositories({
      search: "react",
      stars: ">500",
    });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        q: '"react" stars:>500 in:name,description,topics,readme',
      }),
    );
  });

  it("passes a filtered search for followers", () => {
    searchRepositories({
      search: "react",
      followers: ">300",
    });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        q: '"react" followers:>300 in:name,description,topics,readme',
      }),
    );
  });

  it("passes a filtered search for language", () => {
    searchRepositories({
      search: "react",
      language: "ruby",
    });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        q: '"react" language:ruby in:name,description,topics,readme',
      }),
    );
  });

  it("passes a filtered search for combined filters", () => {
    searchRepositories({
      search: "react",
      language: "ruby",
      stars: ">500",
      followers: ">300",
    });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        q: '"react" stars:>500 followers:>300 language:ruby in:name,description,topics,readme',
      }),
    );
  });

  it("passes a sorted search", () => {
    searchRepositories({
      search: "react",
      sort: "stars",
      order: "desc",
    });
    expect(request).toHaveBeenCalledWith(
      "GET /search/repositories",
      expect.objectContaining({
        sort: "stars",
        order: "desc",
        q: '"react" in:name,description,topics,readme',
      }),
    );
  });
});
