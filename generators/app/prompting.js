var stringUtils = require('./string-utils');

module.exports = function(generator) {
  var done = generator.async();
  var appName = stringUtils.camelize(generator.appname);

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
      default : '0.15.0',
    },
    {
      type    : 'input',
      name    : 'packageName',
      message : 'Your Android module package name',
      default : 'fr.bamlab.' + appName.toLowerCase(),
    },
  ];

  generator.prompt(prompts, function (answers) {
    for (var key in answers) {
      if (answers.hasOwnProperty(key)) {
        generator[key] = answers[key];
      }
    }
    generator.npmModuleName = 'react-native-' + generator.appname.toLowerCase();
    done();
  }.bind(generator));
};
