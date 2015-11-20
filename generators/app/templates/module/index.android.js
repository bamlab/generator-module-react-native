import React from 'react-native';

const <%= moduleName %> = React.NativeModules.<%= moduleName %>;

export default {
  <%= reactMethodName %>: (onSuccess, onFailure) => {
    return <%= reactMethodName %>.<%= moduleName %>(onSucess, onFailure);
  },
};
