'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * render a template given a src, dest, and project name
 * @param  {[type]} src  [description]
 * @param  {[type]} dest [description]
 * @param  {[type]} name [description]
 */
let render = (() => {
  var _ref = _asyncToGenerator(function* (src, dest, name) {
    console.log('src>>>', src, dest);
    const metalsmith = (0, _metalsmith2.default)(_path2.default.resolve(src, 'template'));
    const opts = getMetaData(src);
    const data = Object.assign(metalsmith.metadata(), {
      destDirName: name,
      inPlace: dest === process.cwd(),
      noEscape: true
    });
    let questiones = [];
    Object.keys(opts.prompts).forEach(function (key, index) {
      const prompt = opts.prompts[key];
      let question = {
        type: prompt.type,
        name: key,
        message: prompt.message || prompt.label || key,
        default: promptDefault,
        choices: prompt.choices || [],
        validate: prompt.validate || function () {
          return true;
        }
      };
      questiones.push(question);
    });
    console.log('questiones>>>', questiones);

    // metalsmith
    //   .use(askQuestions(opts.prompts))
    //   .source('./')
    //   .destination(resolve(root, dir))
    //   .clean(false)
    //   .use(render())
    //   .build(err => {
    //     if (err) {
    //       // reject(err);
    //       loader.fail(`generated fail, please try again`)
    //       return;
    //     }
    //     loader.succeed(`generated, To get started:\n\n  cd \n  npm install\n  npm run dev`);
    //     // resolve(true);
    //   });
  });

  return function render(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

// plugin _render


var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('mz/fs');

var _readMetadata = require('read-metadata');

var _readMetadata2 = _interopRequireDefault(_readMetadata);

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const renderContent = require('consolidate').handlebars.render;

// register handlebars helper
_handlebars2.default.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

_handlebars2.default.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ? opts.inverse(this) : opts.fn(this);
});function _render(files, metalsmith, next) {
  const meta = metalsmith.metadata();
  console.log('files>>>', files);

  Object.keys(files).forEach(function (file) {
    const str = files[file].contents.toString();

    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(str)) {
      return next();
    }

    renderContent(str, meta, (err, res) => {
      if (err) {
        return next(err);
      }

      files[file].contents = new Buffer(res);
      next();
    });
  });
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */
function getMetaData(dir) {
  const json = _path2.default.resolve(dir, 'meta.json');
  const js = _path2.default.resolve(dir, 'meta.js');
  let opts = {};

  if ((0, _fs.exists)(json)) {
    opts = _readMetadata2.default.sync(json);
  } else if ((0, _fs.exists)(js)) {
    const req = (0, _common.betterRequire)(_path2.default.resolve(js));
    if (req !== Object(req)) {
      logger.error('meta.js needs to export an object');
    }
    opts = req;
  }

  return opts;
}

exports.default = render;