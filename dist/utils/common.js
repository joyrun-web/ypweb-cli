'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betterRequire = betterRequire;
exports.wrapperAsync = wrapperAsync;
exports.runBash = runBash;

var _child_process = require('child_process');

function betterRequire(absolutePath) {
  const module = require(absolutePath);
  return exports.__esModule && module.default ? module.default : module;
}

function wrapperAsync(fn) {
  if (fn.constructor.name === 'AsyncFunction') {
    return fn;
  }

  return function _promisify(...args) {
    return new Promise(resolve => {
      resolve(fn(...args));
    });
  };
}

function runBash(bash, options = {}) {
  return new Promise((resolve, reject) => {
    const p = (0, _child_process.exec)(bash, options, error => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
  });
}