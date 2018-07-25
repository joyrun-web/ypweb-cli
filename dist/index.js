'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* (command, ...args) {
    try {
      yield (0, _common.betterRequire)((0, _path.resolve)(__dirname, `./${command}`))(...args);
    } catch (e) {
      console.log(_chalk2.default.red(e));
    }
  });

  return function apply(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _path = require('path');

var _defs = require('./utils/defs');

var _check = require('./utils/check');

var _common = require('./utils/common');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (!(0, _check.checkNodeVersion)()) {
  throw new Error(`Node version is invalid. Please use Node ${versions.nodeEngines} `);
}

exports.default = apply;