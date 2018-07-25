'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderContent = require('consolidate').handlebars.render;

// register handlebars helper
_handlebars2.default.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

_handlebars2.default.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ? opts.inverse(this) : opts.fn(this);
});

function render() {
  return (files, metalsmith, next) => {
    // answers
    const meta = metalsmith.metadata();
    // exclude .git*
    var keys = Object.keys(files).filter(file => /^(?!\.git).*/.test(file));

    keys.forEach(function (file) {
      const str = files[file].contents.toString();
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next();
      }

      renderContent(str, meta, (err, res) => {
        if (err) {
          return next(err);
        }

        files[file].contents = new Buffer.from(res);
        next();
      });
    });
  };
}

exports.default = render;