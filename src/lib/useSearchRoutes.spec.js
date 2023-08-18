import { useSearchParams } from "next/navigation";
import { useSearchRoutes } from "./useSearchRoutes";
import { addToHistory } from "@/lib/history";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push })),
  usePathname: jest.fn(() => "mock-pathname/"),
  useSearchParams: jest.fn(() => new URLSearchParams("")),
}));

jest.mock("@/lib/history", () => ({
  addToHistory: jest.fn(),
}));

describe("useSearchRoutes: setParameters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds params to the route", () => {
    const { setParameters } = useSearchRoutes();
    setParameters({ search: "react" });

    expect(push).toBeCalledWith("mock-pathname/?search=react");
  });

  it("adds numbers to route", () => {
    const { setParameters } = useSearchRoutes();
    setParameters({ search: "react", stars: ">3" });

    expect(push).toBeCalledWith("mock-pathname/?search=react&stars=%3E3");
  });

  it("ignores invalid numbers", () => {
    const { setParameters } = useSearchRoutes();
    setParameters({ search: "react", stars: ">" });

    expect(push).toBeCalledWith("mock-pathname/?search=react");
  });

  it("adds params to history", () => {
    const { setParameters } = useSearchRoutes();
    setParameters({ search: "react" });

    expect(addToHistory).toBeCalledWith("search=react");
  });

  it("replaces passed param", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams("search=react"),
    );

    const { setParameters } = useSearchRoutes();
    setParameters({ search: "angular" });

    expect(push).toBeCalledWith("mock-pathname/?search=angular");
  });

  it("keeps existing params when not passed", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams("search=react"),
    );

    const { setParameters } = useSearchRoutes();
    setParameters({ sort: "stars" });

    expect(push).toBeCalledWith("mock-pathname/?search=react&sort=stars");
  });

  it("removes params when passed empty", () => {
    useSearchParams.mockImplementationOnce(
      () => new URLSearchParams("search=react&sort=stars"),
    );

    const { setParameters } = useSearchRoutes();
    setParameters({ sort: "" });

    expect(push).toBeCalledWith("mock-pathname/?search=react");
  });
});
