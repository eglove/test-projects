import config from "@ethang/eslint-config/eslint.config.js";
import tseslint from "typescript-eslint";
import reactConfig from "@ethang/eslint-config/config.react.js"; // OPTIONAL

export default tseslint.config(...config, ...reactConfig, {
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
        "barrel/avoid-importing-barrel-files": "off",
    }
});