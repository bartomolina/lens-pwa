import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-mumbai.lens.dev",
  documents: "./graphql/*.graphql",
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
