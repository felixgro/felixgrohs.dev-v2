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
	// remove default style alias
	delete config.resolve.alias.style;

	// add global src alias
	console.dir(helpers);
	// config.resolve.alias['src'] = helpers.resolve('src');
	// console.log(config.module.rules[5]);
};
