'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    if (!(yield (0, _fs.exists)(_defs.dirs.download))) {
      _logger2.default.error(`There is no ${_defs.dirs.download}, Please install a template`);
    }

    const list = yield (0, _fs.readdir)(_defs.dirs.download);

    let version, info;
    if (list.length === 0) {
      _logger2.default.error(`There is no template download in ${_defs.dirs.download}`);
    }

    list.forEach(function (dir) {
      try {
        info = (0, _common.betterRequire)(`${_defs.dirs.download}/${dir}/package.json`);
        version = info.version;
      } catch (e) {
        version = '0.0.0';
      }

      _logger2.default.log(`${dir}@${version}`);
    });
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

var _fs = require('mz/fs');

var _common = require('./utils/common');

var _defs = require('./utils/defs');

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * ypweb list
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = apply;