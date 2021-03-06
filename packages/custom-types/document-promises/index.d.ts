// Type definitions for document-promises v3.1.2
// Project: https://github.com/jonathantneal/document-promises
// Definitions by: Tiger Oakes <https://github.com/NotWoods>

declare module 'document-promises' {
	/**
	 * document.parsed is a promise that fulfills when the document is
	 * parsed and `readyState` is `interactive`,
	 * before deferred and async scripts have run.
	 */
	export const parsed: Promise<void>;

	/**
	 * document.contentLoaded is a promise that fulfills when the document is parsed,
	 * blocking scripts have completed, and `DOMContentLoaded` fires.
	 */
	export const contentLoaded: Promise<void>;

	/**
	 * document.loaded is a promise that fulfills when the document is parsed,
	 * blocking scripts have completed, images, scripts,
	 * links and sub-frames have finished loading, and `readyState` is `complete`.
	 */
	export const loaded: Promise<void>;
}
