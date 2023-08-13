import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import SearchForm from "./index";

const setParameters = jest.fn();

jest.mock("@/lib/useSearchRoutes", () => ({
  useSearchRoutes: jest.fn(() => ({
    setParameters,
  })),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits a basic search", () => {
    render(<SearchForm />);

    const searchInput = screen.getByLabelText("search");

    fireEvent.change(searchInput, {
      target: { value: "react" },
    });
    fireEvent.submit(searchInput);

    expect(setParameters).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "react",
      }),
    );
  });

  it("prefils the form based on query", () => {
    render(<SearchForm query={{ search: "react" }} />);

    const searchInput = screen.getByLabelText("search");
    expect(searchInput.value).toBe("react");
  });

  it("sorts the results", () => {
    render(<SearchForm />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Sort by:/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("menuitem", {
        name: /Most stars/i,
      }),
    );

    expect(setParameters).toHaveBeenCalledWith(
      expect.objectContaining({ order: "desc", sort: "stars" }),
    );
  });

  it("adds filter", () => {
    render(<SearchForm query={{ search: "react" }} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Filters/i,
      }),
    );

    const languageInput = screen.getByTestId("filter-language");

    fireEvent.change(languageInput, {
      target: { value: "javascript" },
    });
    fireEvent.submit(languageInput);

    expect(setParameters).toHaveBeenCalledWith(
      expect.objectContaining({ language: "javascript" }),
    );
  });

  it("removes a filter", () => {
    render(<SearchForm query={{ search: "react", language: "javascript" }} />);

    const chip = screen.getByRole("button", {
      name: /language: javascript/i,
    });

    fireEvent.click(within(chip).getByTestId("CancelIcon"));

    expect(setParameters).toHaveBeenCalledWith(
      expect.objectContaining({ language: "" }),
    );
  });
});
