'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _package = require('../package.json');

var _defs = require('./utils/defs');

var _rc = require('./utils/rc');

var _rc2 = _interopRequireDefault(_rc);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function help() {
  console.log('');
  console.log('  How to use:');
  console.log();
  console.log('    - ypweb install');
  console.log('    - ypweb init');
  console.log('    - ypweb clear');
  console.log('    - ypweb list');
  console.log('    - ypweb update');
  console.log('    - ypweb search');
  console.log('    - ypweb uninstall <installed template>');
  console.log('    - ypweb config set <key> <value>');
  console.log('    - ypweb config remove <key>');
  console.log('    - ypweb config get <key>');
  console.log('    - ypweb config help');
  console.log();
}

function registeredProgram(program, type, typeInfo) {
  program.command(type).description(typeInfo[type]).alias(_defs.alias[type]).action(_asyncToGenerator(function* () {
    try {
      if (type === 'config') {
        // get config third paramter, eg: ypweb config help -> help
        yield (0, _index2.default)('config', ...process.argv.slice(3));
      } else if (type === 'help') {
        help();
      } else {
        yield (0, _index2.default)(type);
      }
    } catch (e) {
      console.log(e);
    }
  }));

  return program;
}

try {
  (() => {
    var _ref2 = _asyncToGenerator(function* () {
      const registry = yield (0, _rc2.default)('registry');
      const programTypes = {
        list: 'list installed template',
        uninstall: `uninstall a installed template in ${_defs.dirs.download}`,
        update: `update the installed template in ${_defs.dirs.download}`,
        search: 'search the templates from your github organization/user',
        init: 'generate a new project from a template',
        install: `install remote templates from https://github.com/${registry}`,
        clear: 'clear all installed templates',
        help: 'more help info:',
        config: `${_defs.dirs.rc} config file set and get`,
        '*': 'The command is not found'
      };

      _commander2.default.version(_package.version, '-v, --version').usage('<command> [options]');

      // 遍历commander
      Object.keys(programTypes).reduce(function (pre, type) {
        return registeredProgram(pre, type, programTypes);
      }, _commander2.default);

      _commander2.default.on('-h', help).on('--help', help).parse(process.argv);

      // default
      if (_commander2.default.args.length < 1) _commander2.default.help();
    });

    function run() {
      return _ref2.apply(this, arguments);
    }

    return run;
  })()();
} catch (e) {
  console.log(e);
  help();
}