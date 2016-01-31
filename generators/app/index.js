var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function () {
    require('./prompting')(this);
  },
  writing: function () {
    require('./writing')(this);
  },
  npm: function () {
    require('./npm')();
  }
});
