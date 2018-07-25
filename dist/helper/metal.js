'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* (src, dest, answers) {
    const metalsmith = (0, _metalsmith2.default)(src);
    console.log('answers>>>', answers);
    return new Promise(function (resolve, reject) {
      metalsmith.metadata(answers).source('./').destination(dest).clean(false).use((0, _render2.default)()).build(function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  });

  return function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = apply;