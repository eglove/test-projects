import config from "@ethang/eslint-config/eslint.config.js";
import tseslint from "typescript-eslint";
import solidConfig from '@ethang/eslint-config/config.solid.js';

export default tseslint.config(...config, ...solidConfig, {
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
    rules: {
        'sonar/no-unknown-property': 'off', // TODO this is react specific
        'barrel/avoid-importing-barrel-files': 'off',
        'no-console': 'off',
    }
});