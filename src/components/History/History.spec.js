import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { getHistory } from "@/lib/history";
import History from "./index";

jest.mock("@/lib/history", () => ({
  getHistory: jest.fn(() => ["search=react&sort=stars&order=desc"]),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns history", () => {
    render(<History />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("most stars")).toBeInTheDocument();
  });

  it("returns a welcome screen without query", () => {
    getHistory.mockImplementationOnce(() => []);
    render(<History />);

    expect(screen.getByTestId("no-history")).toBeInTheDocument();
  });
});
