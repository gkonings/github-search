import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./src/",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components/$1",
    "^@/lib(.*)$": "<rootDir>/src/lib/$1",
  },
};

export default createJestConfig(config);
