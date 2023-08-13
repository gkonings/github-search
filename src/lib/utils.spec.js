import { getTagValue } from "./utils";

describe("getTagValue", () => {
  it("returns language value", () => {
    const params = {
      language: "javascript",
    };

    const result = getTagValue({ key: "language", params });

    expect(result).toBe("javascript");
  });

  it("returns stars value (exact)", () => {
    const params = {
      stars: "30",
    };

    const result = getTagValue({ key: "stars", params });

    expect(result).toBe("30");
  });

  it("returns stars value (more than)", () => {
    const params = {
      stars: ">30",
    };

    const result = getTagValue({ key: "stars", params });

    expect(result).toBe("more than 30");
  });

  it("returns stars value (less than)", () => {
    const params = {
      stars: "<30",
    };

    const result = getTagValue({ key: "stars", params });

    expect(result).toBe("less than 30");
  });

  it("returns sort value value (most stars)", () => {
    const params = {
      sort: "stars",
      order: "desc",
    };

    const result = getTagValue({ key: "sort", params });

    expect(result).toBe("most stars");
  });

  it("returns sort value value (fewest stars)", () => {
    const params = {
      sort: "stars",
      order: "asc",
    };

    const result = getTagValue({ key: "sort", params });

    expect(result).toBe("fewest stars");
  });
});
