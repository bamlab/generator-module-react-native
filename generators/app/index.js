var generators = require('yeoman-generator');
var stringUtils = require('./string-utils');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    var appName = stringUtils.camelize(this.appname);

    var prompts = [
      {
        type    : 'input',
        name    : 'moduleName',
        message : 'Your module name',
        default : stringUtils.capitalizeFirstLetter(appName),
      },
      {
        type    : 'input',
        name    : 'packageName',
        message : 'Your module package name',
        default : 'fr.bamlab.' + appName.toLowerCase(),
      },
      {
        type    : 'input',
        name    : 'reactMethodName',
        message : 'Your first react method name',
        default : appName,
      },
      {
        type    : 'input',
        name    : 'reactNativeVersion',
        message : 'The react native version you want to use',
        default : '0.14.+',
      }
    ];

    this.prompt(prompts, function (answers) {
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          this[key] = answers[key];
        }
      }
      done();
    }.bind(this));
  },

  writing: function () {
    this.directory('module/', '.');
    var packageFolders = this.packageName.split('.');
    var currentFolder = './android/src/main/java/';
    packageFolders.forEach(function(packageFolder){
      mkdirp.sync(currentFolder + packageFolder);
      currentFolder += packageFolder + '/';
    });
    this.copy('package/Module.java', currentFolder + this.moduleName + 'Module.java');
    this.copy('package/Package.java', currentFolder + this.moduleName + 'Package.java');
  }
});
