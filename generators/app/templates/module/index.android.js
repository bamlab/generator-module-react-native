import React from 'react-native';

const <%= moduleName %> = React.NativeModules.<%= moduleName %>;

export default {
  <%= reactMethodName %>: (onSuccess, onFailure) => {
    return <%= moduleName %>.<%= reactMethodName %>(onSuccess, onFailure);
  },
};
