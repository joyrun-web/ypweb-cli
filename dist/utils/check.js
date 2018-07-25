'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNodeVersion = exports.checkRepoVersion = undefined;

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _package = require('../../package.json');

var _defs = require('./defs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkRepoVersion = exports.checkRepoVersion = repo => /^[a-z_]+@[0-9]/.test(repo);
const checkNodeVersion = exports.checkNodeVersion = () => _semver2.default.satisfies(_defs.versions.node, _package.engines.node);