export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "style", "refactor", "test", "revert"]],
      "subject-case": [0], //case insensitive
    },
  };