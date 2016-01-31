var generators = require('yeoman-generator');
var stringUtils = require('./string-utils');
var mkdirp = require('mkdirp');

var writeCommonPart = function(generator) {
  generator.directory('common/', '.');
};

var setupAndroidPackageFolders = function(packageName) {
  var packageFolders = packageName.split('.');
  var currentFolder = './android/src/main/java/';
  packageFolders.forEach(function(packageFolder) {
    mkdirp.sync(currentFolder + packageFolder);
    currentFolder += packageFolder + '/';
  });

  return currentFolder;
};

var writeAndroidPart = function(generator) {
  generator.directory('android/module/', '.');
  var packageFolder = setupAndroidPackageFolders(generator.packageName);
  generator.copy('android/package/Module.java', packageFolder + generator.moduleName + 'Module.java');
  generator.copy('android/package/Package.java', packageFolder + generator.moduleName + 'Package.java');
};

var writeIOSPart = function(generator) {
  generator.copy('ios/index.ios.js', 'index.ios.js');
  var iosFiles = [
    'ios/RCTModule/RCTModule.h',
    'ios/RCTModule/RCTModule.m',
    'ios/RCTModule.xcodeproj/project.pbxproj'
  ];

  iosFiles.forEach(function (iosFile) {
    generator.copy(iosFile, iosFile.replace(/Module/g, generator.moduleName));
  });
};

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
        name    : 'reactMethodName',
        message : 'Your first react method name',
        default : appName,
      },
      {
        type    : 'input',
        name    : 'reactNativeVersion',
        message : 'The react native version you want to use',
        default : '0.14.+',
      },
      {
        type    : 'input',
        name    : 'packageName',
        message : 'Your Android module package name',
        default : 'fr.bamlab.' + appName.toLowerCase(),
      },
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
    writeCommonPart(this);
    writeAndroidPart(this);
    writeIOSPart(this);
  }
});
