import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-v2-mumbai.lens.dev",
  documents: "./graphql/v2/**/*.graphql",
  generates: {
    "./graphql/v2/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
