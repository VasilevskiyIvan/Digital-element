import delementConfig from "@delement/eslint-config-master";

const baseConfig = Array.isArray(delementConfig) ? delementConfig : [ delementConfig ];

export default [
  ...baseConfig,
  {
    ignores: [ "dist/**", "node_modules/**" ],
  },
  {
    files: [ "**/*.{js,ts}" ],
  },
  {
    settings: {
      react: {
        version: "18.0",
      },
    },
  },
];
