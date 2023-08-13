import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { searchRepositories } from "@/lib/github";
import SearchResults from "./index";

jest.mock("@/lib/github", () => ({
  searchRepositories: jest.fn(() =>
    Promise.resolve([
      {
        id: "mock-id-1",
        full_name: "mock-full-name",
        html_url: "mock-html-url",
        description: "mock-description",
        language: "mock-language",
        stargazers_count: "mock-stargazers-count",
        owner: {
          login: "mock-owner-login",
          avatar_url: "mock-owner-avatar-url",
        },
      },
    ]),
  ),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a welcome screen without query", () => {
    render(<SearchResults />);

    expect(screen.getByTestId("welcome-screen")).toBeInTheDocument();
  });

  it("returns results when passing a query", async () => {
    render(<SearchResults query={{ search: "react" }} />);

    expect(screen.getByTestId("result-is-loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("mock-full-name")).toBeInTheDocument(),
    );
  });

  it("returns message when no results", async () => {
    searchRepositories.mockImplementationOnce(() => Promise.resolve([]));
    render(<SearchResults query={{ search: "react" }} />);

    expect(screen.getByTestId("result-is-loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("no-result")).toBeInTheDocument(),
    );
  });

  it("returns error page when something went wrong", async () => {
    searchRepositories.mockImplementationOnce(() =>
      Promise.reject(new Error("something went wrong")),
    );
    render(<SearchResults query={{ search: "react" }} />);

    expect(screen.getByTestId("result-is-loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("error")).toBeInTheDocument(),
    );
  });
});
