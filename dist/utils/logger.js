'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

/**
 * logger
 */
exports.log = function (...args) {
  const msg = _util.format.apply(_util.format, args);
  console.log(_chalk2.default.white(msg));
};

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.error = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim();
  const msg = _util.format.apply(_util.format, args);
  console.error(_chalk2.default.red(msg));
  process.exit(1);
};

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function (...args) {
  const msg = _util.format.apply(_util.format, args);
  console.log(_chalk2.default.green(msg));
};