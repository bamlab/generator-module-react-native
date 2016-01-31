var init = require('init-package-json');
var path = require('path');

var initFile = path.resolve(process.env.HOME, '.npm-init');
var dir = process.cwd();

module.exports = function() {
  init(dir, initFile, {}, function (er, data) {
    //
  });
};
