'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Checks if the document has a non-loading readystate, and resolves
 * once it does/changes to be ready.
 * @param {Document} document
 * @returns {Promise} resolves when ready
 * @alias module:lib/utils.isReady
 */
const isReady = document => new Promise(resolve => {
	function checkState() {
		if (document.readyState != 'loading') {
			resolve(); return true;
		}
	}
	if (checkState()) return;
	document.addEventListener('readystatechange', checkState);
})

/**
 * Resolves when the DOM is ready to interact with
 * @type {Promise<void>}
 * @author Jake Archibald
 * @see {@link https://github.com/jakearchibald/offline-wikipedia}
 * @requires document
 * @alias module:lib/utils.domReady
 */
const domReady = typeof document === 'undefined' 
	? null
	: isReady(document);

const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * A simple javascript utility for conditionally joining classNames together.
 * Slight ES6 adjustments from the fork.
 * @see https://github.com/JedWatson/classnames
 * @alias module:lib/utils.classlist
 */
function classList(...classes) {
	let list = [];
	for (let classname of classes) {
		if (!classname) continue; //skip falsy values
		
		const type = typeof classname;
		if (type === 'string' || type === 'number') 
			list.push(classname);
		else if (Array.isArray(classname)) 
			list.push( classList(...classname) );
		else if (type === 'object') {
			for (let key in classname) 
				if (has(classname, key) && classname[key]) list.push(key);
		}
	}
	return list.join(' ');
}

/**
 * Generate unique IDs. Guaranteed to be unique when compared to other strings
 * generated by this function. The strings are complex enough that they 
 * shouldn't be accidentally duplicated by hand.
 * 
 * Math.random should be unqiue because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters
 * after the decimal.
 * 
 * @returns {string}
 * @see https://gist.github.com/gordonbrander/2230317
 * @alias module:lib/utils.id
 */
const id = () => '_' + Math.random().toString(36).substr(2, 9);

const has$1 = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

const REMOVED = Symbol();

/**
 * Returns an object only containing properties that have changed between
 * the two given objects.
 * @param {Object} oldStore
 * @param {Object} newStore
 * @returns {Object[]} an object with only updated keys. Removed keys are
 * given a value of the REMOVED Symbol.
 * @alias module:lib/utils.diff
 */
function diff(oldStore, newStore) {
	if (oldStore === newStore) return undefined;
	if (typeof newStore !== typeof oldStore) return newStore;
	else if (Array.isArray(newStore)) {
		let clone = [...newStore];
		return oldStore.reduce((difference, oldValue) => {
			const newIndex = clone.indexOf(oldValue);
			if (newIndex === -1) difference.push(REMOVED);
			else {
				const subdiff = diff(oldValue, clone[newIndex]);
				difference.push(subdiff);
				clone.splice(newIndex, 1); 
			}
			return difference;
		}, []).concat(clone);
	} else if (typeof newStore == 'object' && newStore !== null) {
		let oldKeys = Object.keys(oldStore);
		let difference = {};
		for (let newKey in newStore) {
			if (!has$1(oldStore, newKey)) difference[newKey] = newStore[newKey];
			else {
				const subdiff = diff(oldStore[newKey], newStore[newKey]);
				if (subdiff !== undefined) difference[newKey] = subdiff;
				oldKeys.splice(oldKeys.indexOf(newKey), 1);
			}
		}
		for (let removedKey of oldKeys) difference[removedKey] = REMOVED;
		return difference;
	} else return newStore;
}

/**
 * Transforms an array of objects into a keyed map, using the specified
 * key property as the key used in the Map.
 * @param {Array<Object>} array
 * @param {string} [idKey]
 * @returns {Map<string, Object>}
 * @alias module:lib/utils.arrayToMap
 */
function arrayToMap(array, idKey) {
	return array.reduce((map, obj) => map.set(obj[idKey]||id(), obj), new Map());
}

/**
 * Transforms an array of objects into a keyed object, using the specified
 * key property as the key used in the new object.
 * @param {Array<Object>} array
 * @param {string} [idKey]
 * @returns {Object}
 * @alias module:lib/utils.arrayToObjectMap
 */
function arrayToObjectMap(array, idKey) {
	if (!Array.isArray(array))
		throw TypeError('arrayToObjectMap was not given an array');

	return array.reduce((newObj, obj) => {
		newObj[obj[idKey] || id()] = obj;
		return newObj;
	}, {});
}

/**
 * Transforms a map into an object. Non-string and non-number keys are ignored.
 * @param {Map} map
 * @returns {Object}
 * @alias module:lib/utils.mapToObject
 */
function mapToObject(map) {
	let obj = {};
	for (const [key, value] of map) 
		if (typeof key === 'string') obj[key] = value;
	return obj;
}

/**
 * A function that can be used as the 'default value' of a parameter to quickly
 * throw TypeErrors for required parameters
 * @param {string} [message] - appends extra text to the error message.
 * @throws {TypeError} 
 * @alias module:lib/utils.required
 * @example
 * function foo(bar = required()) {
 *   //code that needs bar
 * }
 * 
 * foo() //TypeError: Missing required function parameter
 * @example
 * function hello(target = required('target')) {
 *   return 'Hello ' + target;
 * }
 * hello() //TypeError: Missing required function parameter target
 */
function required(message) {
	const append = message ? ` ${message}` : '';
	throw TypeError('Missing required function parameter' + append);
}

/**
 * Creates an object composed of the own string keyed
 * properties of source that are not set to be omitted.
 * @param {Object} source
 * @param {...string|string[]} props
 * @returns {Object}
 */
function omit(source = {}, ...props) {
	if (props.length === 0 && Array.isArray(props[0])) props = props[0];

	let target = {};
	for (const key in source) {
		if (!props.includes(key)) target[key] = source[key];
	}

	return target;
}

/**
 * Formats a camelCase string into a string with normal casing and spaces.
 * @param {string} string
 * @returns {string}
 * @example
 * format('camelCaseText') //returns Camel Case Text
 */
function format(string) {
	if (typeof string === 'undefined') return undefined;
	const spaced = string.replace(/[A-Z]/g, match => ` ${match}`);
	return spaced.charAt(0).toUpperCase() + spaced.substr(1);
}

exports.domready = domReady;
exports.isReady = isReady;
exports.classlist = classList;
exports.id = id;
exports.diff = diff;
exports.REMOVED = REMOVED;
exports.required = required;
exports.omit = omit;
exports.format = format;
exports.arrayToMap = arrayToMap;
exports.arrayToObjectMap = arrayToObjectMap;
exports.mapToObject = mapToObject;
//# sourceMappingURL=index.node.js.map
