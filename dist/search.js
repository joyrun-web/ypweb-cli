'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _git = require('./utils/git');

var _loading = require('./utils/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* () {
    const answers = yield _inquirer2.default.prompt([{
      type: 'input',
      name: 'search',
      message: 'search repo'
    }]);

    if (answers.search) {
      const loder = (0, _loading2.default)('searching');
      let list = yield (0, _git.searchList)();

      list = list.filter(function (item) {
        return item.name.indexOf(answers.search) > -1;
      }).map(function ({ name }) {
        return name;
      });

      loder.succeed('search end');

      console.log('');
      if (list.length === 0) {
        console.log(`${answers.search} is not found`);
      }
      console.log(list.join('\n') + ' found');
      console.log('');
    }
  });

  function search() {
    return _ref.apply(this, arguments);
  }

  return search;
})();