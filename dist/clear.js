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

    if (list.length === 0) {
      _logger2.default.error(`There is no any template in your local folder ${_defs.dirs.download}, install it`);
    }

    const answers = yield _inquirer2.default.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to remove all installed templates?',
      choices: list
    }]);

    if (answers.confirm) {
      const loader = (0, _loading2.default)('removing');
      list.forEach((() => {
        var _ref2 = _asyncToGenerator(function* (dir) {
          return yield (0, _rmfr2.default)(`${_defs.dirs.download}/${dir}`);
        });

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      })());
      loader.succeed('removed all');
    }
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

var _fs = require('mz/fs');

var _rmfr = require('rmfr');

var _rmfr2 = _interopRequireDefault(_rmfr);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

var _defs = require('./utils/defs');

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * clear downloaded templates
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = apply;