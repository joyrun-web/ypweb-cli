'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* (k, v, remove) {
    let config, content, setting;
    const isExist = yield (0, _fs.exists)(_defs.dirs.rc);

    // delete config value
    if (remove) {
      config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
      if (config[k]) {
        delete config[k];
        setting = Object.assign({}, config, { [k]: v || null });
        yield (0, _fs.writeFile)(_defs.dirs.rc, _ini2.default.stringify(setting));
      } else {
        yield (0, _rmfr2.default)(`${_defs.dirs.rc}`);
      }
      return true;
    }

    // write default setting to home rc path
    if (!k || k.length === 0) {
      if (!isExist) {
        content = _ini2.default.stringify(_defs.defaults);
        yield (0, _fs.writeFile)(_defs.dirs.rc, content);
        return content;
      }
      return _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
    }

    // get config value
    if (!v || v.length == 0) {
      if (!isExist) return _defs.defaults[k];
      config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
      return emptyValues[config[k]] ? _defs.defaults[k] : config[k];
    }

    // set config value
    if (k.length > 0 && v.length > 0) {
      if (!isExist) {
        config = {};
      } else {
        config = _ini2.default.parse((yield (0, _fs.readFile)(_defs.dirs.rc, 'utf-8')));
      }

      setting = Object.assign({}, config, { [k]: v });
      yield (0, _fs.writeFile)(_defs.dirs.rc, _ini2.default.stringify(setting));
    }
  });

  return function apply(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _fs = require('mz/fs');

var _defs = require('./defs');

var _rmfr = require('rmfr');

var _rmfr2 = _interopRequireDefault(_rmfr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // read config

const emptyValues = {
  undifined: true,
  null: true,
  0: true
};

exports.default = apply;