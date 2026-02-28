import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
	js.configs.recommended,
	eslintConfigPrettier,
	{
		rules: {
			'no-console': 0,
		},
	},
]);
