import React from 'react-native';

const <%= moduleName %> = React.NativeModules.<%= moduleName %>;

export default {
  <%= reactMethodName %>: () => {
    return <%= moduleName %>.<%= reactMethodName %>();
  },
};
