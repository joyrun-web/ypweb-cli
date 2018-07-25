'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let apply = (() => {
  var _ref = _asyncToGenerator(function* () {
    let answers, loader, choices, version;

    const list = yield (0, _fs.readdir)(_defs.dirs.download);

    if (list.length === 0) {
      throw new Error(`There is no any scaffolds in your local folder ${_defs.dirs.download}, install it`);
    }

    answers = yield _inquirer2.default.prompt([{
      type: 'list',
      name: 'scaffold',
      message: 'which scaffold do you want to update?',
      choices: list,
      validate(input) {
        var _this = this;

        return _asyncToGenerator(function* () {
          const done = _this.async();

          if (input.length === 0) {
            done('You must choice one scaffold to update the version. If not update, Ctrl+C');
            return;
          }

          done(null, true);
        })();
      }
    }]);

    const repo = answers.scaffold;

    loader = (0, _loading2.default)('tag list fetching', repo);
    const tags = yield (0, _git.tagsList)(repo);
    loader.succeed();

    if (tags.length === 0) {
      version = '';
    } else {
      choices = tags.map(function ({ name }) {
        return name;
      });

      answers = yield _inquirer2.default.prompt([{
        type: 'list',
        name: 'version',
        message: 'which version do you want to install?',
        choices
      }]);
      version = answers.version;
    }

    loader = (0, _loading2.default)('updating', repo);
    yield (0, _git.download)([repo, version].join('@'));
    loader.succeed();
  });

  return function apply() {
    return _ref.apply(this, arguments);
  };
})();

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('mz/fs');

var _defs = require('./utils/defs');

var _git = require('./utils/git');

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = apply;