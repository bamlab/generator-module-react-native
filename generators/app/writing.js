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

module.exports = function (generator) {
  writeCommonPart(generator);
  writeAndroidPart(generator);
  writeIOSPart(generator);
};
