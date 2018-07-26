import consolidate from 'consolidate'
import Handlebars from 'handlebars'
const renderContent = require('consolidate').handlebars.render

// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

function render() {
  return (files, metalsmith, next) => {
    // answers
    const meta = metalsmith.metadata()
    // exclude .git*
    var keys = Object.keys(files).filter(file => /^(?!\.git).*/.test(file))

    keys.forEach(function (file) {
      const str = files[file].contents.toString();
      // do not attempt to render files that do not have mustaches
      if (!/{{([^{}]+)}}/g.test(str)) {
        return next()
      }

      renderContent(str, meta, (err, res) => {
        if (err) {
          return next(err)
        }

        files[file].contents = new Buffer(res)
        next();
      });
    })

  }
}

export default render
