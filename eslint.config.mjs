import header from "eslint-plugin-header";

export default {
  plugins: { header },
  rules: {
    "header/header": [2, "./header.js"],
  },
};
