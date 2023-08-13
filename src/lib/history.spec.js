import { getHistory, addToHistory } from "./history";

describe("history", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("sets and gets history", () => {
    addToHistory("mock-string-1");
    const result = getHistory();

    expect(result).toStrictEqual(["mock-string-1"]);
  });

  it("sets and gets multiple history items in correct order", () => {
    addToHistory("mock-string-1");
    addToHistory("mock-string-2");
    const result = getHistory();

    expect(result).toStrictEqual(["mock-string-2", "mock-string-1"]);
  });
});
