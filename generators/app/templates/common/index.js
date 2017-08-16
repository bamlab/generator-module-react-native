// @flow

import { NativeModules } from 'react-native';

const { <%= moduleName %> } = NativeModules;

export default {
  <%= reactMethodName %>: (id: string) => <%= moduleName %>.<%= reactMethodName %>(id),
};
