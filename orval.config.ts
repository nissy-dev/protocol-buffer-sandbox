import { defineConfig } from "orval";

export default defineConfig({
  sample: {
    input: "./gen/openapi-v3/openapi/openapi.yaml",
    output: {
      mock: true,
      client: "axios",
      target: "src/api/generated.ts",
      schemas: "src/model",
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
