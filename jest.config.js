// informa de forma manual o arquivo .env que será carregado
import dotenv from "dotenv";
dotenv.config({
  path: ".env.development",
});

import nextJest from "next/jest.js";

// Function factory
const creatJestConfig = nextJest({
  dir: ".",
});
const jestConfig = creatJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

export default jestConfig;
