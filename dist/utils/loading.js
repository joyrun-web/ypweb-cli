'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loading(action = 'getting', repo = '') {
  const loading = (0, _ora2.default)(`${action} ${repo}`);
  return loading.start();
}

exports.default = loading;