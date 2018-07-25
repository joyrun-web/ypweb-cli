'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('mz/fs');

var _rmfr = require('rmfr');

var _rmfr2 = _interopRequireDefault(_rmfr);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _defs = require('./utils/defs');

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* () {
    if (!(yield (0, _fs.exists)(_defs.dirs.download))) {
      throw new Error(`There is no ${_defs.dirs.download}, Please install a template`);
    }

    const list = yield (0, _fs.readdir)(_defs.dirs.download);

    if (list.length === 0) {
      throw new Error(`There is no any scaffolds in your local folder ${_defs.dirs.download}, install it`);
    }

    const answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'scaffold',
      message: 'which scaffold do you want to uninstall it ?',
      choices: list
    }]);

    if (answers.scaffold) {
      const loder = (0, _loading2.default)(`removing ${answers.scaffold}`);
      yield (0, _rmfr2.default)(`${_defs.dirs.download}/${answers.scaffold}`);
      loder.succeed(`removed ${answers.scaffold}`);
    }
  });

  function apply() {
    return _ref.apply(this, arguments);
  }

  return apply;
})();