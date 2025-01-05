// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
			prettierConfig // Deshabilita reglas conflictivas con Prettier
		],
		processor: angular.processInlineTemplates,
		plugins: {
			prettier: prettierPlugin // Importación correcta del plugin
		},
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase'
				}
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case'
				}
			],
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/member-ordering": "error",
			"@typescript-eslint/consistent-type-assertions": "warn",
			'prettier/prettier': 'error' // Aplica las reglas de Prettier como errores
		}
	},
	{
		files: ['**/*.html'],
		extends: [
			...angular.configs.templateRecommended,
			...angular.configs.templateAccessibility,
			prettierConfig // Extiende Prettier para HTML también
		],
		rules: {
			"@angular-eslint/template/no-call-expression": "warn",
		}
	}
);
