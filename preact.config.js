import path from 'path';

/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 * @see https://github.com/preactjs/preact-cli#custom-configuration
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */
export default (config, env, helpers) => {
	// ESM Import Aliases
	config.resolve.alias['@'] = path.resolve(__dirname, 'src');
	config.resolve.alias['#'] = path.resolve(__dirname, 'src', 'styles', 'modules');

	// Remove default aliases
	delete config.resolve.alias.style;

	// CSS Modules / Postprocessing / Preprocessing
	// https://github.com/preactjs/preact-cli/issues/522
	config.module.rules[4].include = [
		path.resolve(__dirname, 'src', 'styles', 'modules'),
		path.resolve(__dirname, 'src', 'components'),
	];

	config.module.rules[5].exclude = [
		path.resolve(__dirname, 'src', 'styles', 'modules'),
		path.resolve(__dirname, 'src', 'components'),
	];
};
